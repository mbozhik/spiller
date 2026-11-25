import {NextRequest, NextResponse} from 'next/server'
import {Resend} from 'resend'

import {EmailTemplate} from '#/Global/EmailTemplate'
import {client} from '@/lib/sanity'
import {getPromocodes} from '@/lib/get_promocodes'
import {InvalidSubmission, parseSubmission, saveAndNotify, SubmissionConflict, submissionSubjects, type Submission} from '@/lib/submissions'

type CatalogItem = {
  slug: string
  article: number
  name: string
  price: number
  discount_price?: number | null
  unavailable?: boolean
}

type OrderDetails = {
  items?: {_key: string; _type: 'object'; article: number; name: string; price: number; quantity: number; discount_price?: number}[]
  total?: number
  promoCode?: string
  promoDetails?: string
}

async function getOrderDetails(requestedItems: Submission['items'], promoCode: string | undefined): Promise<OrderDetails> {
  if (!requestedItems) return {}

  const [products, promos] = await Promise.all([
    client.fetch<CatalogItem[]>(
      `*[_type == 'product' && slug.current in $slugs]{"slug": slug.current, article, name, price, discount_price, unavailable}`,
      {slugs: requestedItems.map(item => item.slug)},
      {cache: 'no-store'},
    ),
    promoCode ? getPromocodes() : Promise.resolve([]),
  ])
  const bySlug = new Map(products.map(product => [product.slug, product]))
  const items = requestedItems.map(({slug, quantity}, index) => {
    const product = bySlug.get(slug)
    if (!product || product.unavailable || !Number.isFinite(product.price) || product.price < 0) throw new InvalidSubmission()
    const {article, name, price, discount_price} = product
    const discountPrice = typeof discount_price === 'number' && discount_price >= 0 && discount_price < price ? discount_price : undefined
    return {_key: String(index), _type: 'object' as const, article, name, price, discount_price: discountPrice, quantity}
  })
  const promo = promos.find(p => p.is_enabled === true && p.code === promoCode && Number.isFinite(p.discount) && p.discount >= 0 && p.discount <= 100)
  if (promoCode && !promo) throw new InvalidSubmission()
  const subtotal = items.reduce((sum, item) => sum + (item.discount_price ?? item.price) * item.quantity, 0)
  const total = Math.round(subtotal * (1 - (promo?.discount ?? 0) / 100))
  return {items, total, promoCode: promo?.code, promoDetails: promo ? `Промокод: ${promo.code} — ${promo.discount}%` : 'Промокод не применен'}
}

export async function POST(request: NextRequest) {
  let submission: Submission
  try {
    submission = parseSubmission(await request.json())
  } catch {
    return NextResponse.json({error: 'Invalid submission'}, {status: 400})
  }

  const token = process.env.SANITY_SUBMISSIONS_WRITE_TOKEN
  if (!token) return NextResponse.json({error: 'Submission storage unavailable'}, {status: 503})

  const writeClient = client.withConfig({token, useCdn: false, perspective: 'raw'})
  const {id, requestHash, items, promoCode, ...fields} = submission
  let order: OrderDetails = {}

  const checkDuplicate = async () => {
    const existing = await writeClient.getDocument(id)
    if (!existing) return false
    if (existing._type !== 'submission' || existing.requestHash !== requestHash) throw new SubmissionConflict()
    return true
  }

  try {
    await saveAndNotify(submission, {
      persist: async () => {
        if (await checkDuplicate()) return 'duplicate'
        order = await getOrderDetails(items, promoCode)

        try {
          await writeClient.create({_id: id, _type: 'submission', requestHash, ...fields, ...order, notificationStatus: 'pending'})
          return 'created'
        } catch (error) {
          if (await checkDuplicate()) return 'duplicate'
          throw error
        }
      },
      send: async () => {
        const subject = submissionSubjects[submission.kind]
        const {data, error} = await new Resend(process.env.RESEND_API_KEY).emails.send({
          from: 'Dr. Spiller <notifications@dr-spiller.kz>',
          to: 'sales@dr-spiller.kz',
          subject: `${subject} — Новое заполнение формы на сайте`,
          react: EmailTemplate({...fields, ...order, subject, submissionId: submission.id}),
        })
        if (error || !data?.id) return {error: error?.name ?? 'missing_email_id'}
        return {id: data.id}
      },
      update: async (id, status) => {
        await writeClient.patch(id).set({...status, notificationUpdatedAt: new Date().toISOString()}).commit()
      },
      onStatusError: id => console.error('Could not update submission notification status', id),
    })
    return NextResponse.json({id}, {status: 201})
  } catch (error) {
    if (error instanceof InvalidSubmission) return NextResponse.json({error: 'Invalid or unavailable order'}, {status: 422})
    if (error instanceof SubmissionConflict) return NextResponse.json({error: 'Submission ID conflicts'}, {status: 409})
    console.error('Could not save submission', submission.id)
    return NextResponse.json({error: 'Submission storage unavailable'}, {status: 503})
  }
}
