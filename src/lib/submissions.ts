import {createHash, randomUUID} from 'node:crypto'

export const submissionSubjects = {contact: 'Главная страница', partnership: 'Партнерство', order: 'КОРЗИНА'} as const
type SubmissionKind = keyof typeof submissionSubjects

export class InvalidSubmission extends Error {}
export class SubmissionConflict extends Error {}

function field(value: unknown, limit: number, required = false) {
  if (value == null || value === '') {
    if (required) throw new InvalidSubmission()
    return undefined
  }
  if (typeof value !== 'string' || value.trim().length > limit) throw new InvalidSubmission()
  const trimmed = value.trim()
  if (required && !trimmed) throw new InvalidSubmission()
  return trimmed || undefined
}

function orderItems(value: unknown) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 100) throw new InvalidSubmission()
  const quantities = new Map<string, number>()
  for (const item of value) {
    const slug = field(typeof item?.slug === 'object' ? item.slug?.current : item?.slug, 160, true)!
    if (!Number.isSafeInteger(item.quantity) || item.quantity < 1) throw new InvalidSubmission()
    const quantity = (quantities.get(slug) ?? 0) + item.quantity
    if (quantity > 999) throw new InvalidSubmission()
    quantities.set(slug, quantity)
  }
  return Array.from(quantities, ([slug, quantity]) => ({slug, quantity}))
}

function submissionKind(body: Record<string, unknown>): SubmissionKind {
  if (body.kind === 'contact' || body.kind === 'partnership' || body.kind === 'order') return body.kind
  if (body.kind !== undefined) throw new InvalidSubmission()
  const legacy = (Object.keys(submissionSubjects) as SubmissionKind[]).find(kind => submissionSubjects[kind] === body.subject)
  if (!legacy) throw new InvalidSubmission()
  return legacy
}

export function parseSubmission(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new InvalidSubmission()
  const body = value as Record<string, unknown>
  const kind = submissionKind(body)
  const submissionId = body.kind === undefined && body.submissionId === undefined ? randomUUID() : field(body.submissionId, 36, true)!
  if (!/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(submissionId)) throw new InvalidSubmission()
  const email = field(body.email, 254, true)!
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InvalidSubmission()

  const legacyPromo = typeof body.promoDetails === 'string' ? /^Промокод: (.+) — \d+%$/.exec(body.promoDetails)?.[1] : undefined
  const details = {
    kind,
    email,
    name: field(body.name, 160, kind !== 'partnership'),
    phone: field(body.phone, 60, kind !== 'partnership'),
    message: field(body.message, 3000),
    cosmetologist: kind === 'contact' ? body.cosmetologist === true : undefined,
    naming: kind === 'partnership' ? field(body.naming, 200) : undefined,
    city: kind === 'partnership' ? field(body.city, 120) : undefined,
    businessType: kind === 'partnership' ? field(body.businessType, 160) : undefined,
    items: kind === 'order' ? orderItems(body.items) : undefined,
    promoCode: kind === 'order' ? field(body.promoCode ?? (body.kind === undefined ? legacyPromo : undefined), 80)?.toLowerCase() : undefined,
  }

  return {id: `submissions.${submissionId.toLowerCase()}`, requestHash: createHash('sha256').update(JSON.stringify(details)).digest('hex'), ...details}
}

export type Submission = ReturnType<typeof parseSubmission>
export type NotificationStatus =
  | {notificationStatus: 'accepted'; notificationId: string}
  | {notificationStatus: 'failed'; notificationError: string}

export type NotificationResult = {id: string} | {error: string}

export interface SubmissionDependencies {
  persist: (submission: Submission) => Promise<'created' | 'duplicate'>
  send: (submission: Submission) => Promise<NotificationResult>
  update: (id: string, status: NotificationStatus) => Promise<void>
  onStatusError: (id: string) => void
}

export async function saveAndNotify(submission: Submission, dependencies: SubmissionDependencies) {
  const saved = await dependencies.persist(submission)
  if (saved === 'duplicate') return

  let result: NotificationResult
  try {
    result = await dependencies.send(submission)
  } catch {
    result = {error: 'notification_request_failed'}
  }

  try {
    await dependencies.update(submission.id, 'id' in result
      ? {notificationStatus: 'accepted', notificationId: result.id}
      : {notificationStatus: 'failed', notificationError: result.error})
  } catch {
    dependencies.onStatusError(submission.id)
  }
}
