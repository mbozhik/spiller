import {NextRequest, NextResponse} from 'next/server'
import {EmailTemplate} from '#/Global/EmailTemplate'
import {Resend} from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const emailsList = {
  from: 'notifications@dr-spiller.kz',
  to: 'sales@dr-spiller.kz',
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {email, message} = body

  if (!message || !email) {
    return NextResponse.json({error: 'Missing required fields'}, {status: 400})
  }

  try {
    const {data, error} = await resend.emails.send({
      from: `Dr. Spiller <${emailsList.from}>`,
      to: `${emailsList.to}`,
      subject: `${body.subject} — Новое заполнение формы на сайте`,
      react: EmailTemplate({
        subject: body.subject,
        email: body.email,
        message: body.message,

        name: body.name,
        naming: body.naming,
        city: body.city,
        phone: body.phone,
        businessType: body.businessType,

        cosmetologist: body.cosmetologist,
        items: body.items,
      }),
    })

    if (error) {
      return NextResponse.json({message: 'Email sending failed', error}, {status: 400})
    }

    return NextResponse.json({message: 'Email sent successfully', data}, {status: 200})
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({message: 'Failed to send email', error}, {status: 500})
  }
}
