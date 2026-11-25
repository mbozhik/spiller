import {Body, Container, Column, Head, Heading, Html, Preview, Row, Section, Text} from '@react-email/components'
import * as React from 'react'

interface EmailTemplateProps {
  subject: string
  email: string
  message?: string

  name?: string
  naming?: string
  city?: string
  phone?: string
  businessType?: string

  cosmetologist?: boolean
  items?: {name: string; article: number; price: number; discount_price?: number; quantity: number}[]
  promoDetails?: string
  total?: number
  submissionId?: string
}

export const EmailTemplate = ({subject, email, message, name, naming, city, phone, businessType, cosmetologist, items, promoDetails, total, submissionId}: EmailTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Оставили новую заявку на сайте dr-spiller.kz</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row style={{paddingBottom: '0'}}>
              <Column>
                <Heading as="h2" style={{fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#7D756F'}}>
                  {subject}
                </Heading>

                {items && (
                  <Text style={{...paragraph}}>
                    <ol>
                      {items.map((item, index) => (
                        <li key={index}>
                          <ul>
                            <li>
                              <b>Название:</b> {item.name}
                            </li>
                            <li>
                              <b>Артикул:</b> {item.article}
                            </li>
                            <li>
                              <b>Цена:</b> {item.discount_price ?? item.price} ₸
                            </li>
                            <li>
                              <b>Количество:</b> {item.quantity}
                            </li>
                          </ul>
                          <br />
                        </li>
                      ))}
                    </ol>
                  </Text>
                )}

                {promoDetails && (
                  <Text style={{...paragraph, color: '#7D756F'}}>
                    <b>{promoDetails}</b>
                  </Text>
                )}

                {typeof total === 'number' && <Text style={paragraph}><b>Итого за товары:</b> {total} ₸</Text>}

                {name && (
                  <Text style={{...paragraph}}>
                    <b>Имя:</b> {name}
                  </Text>
                )}
                {naming && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b>Компания:</b> {naming}
                  </Text>
                )}
                {city && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b>Город:</b> {city}
                  </Text>
                )}
                {email && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b>E-mail:</b> {email}
                  </Text>
                )}
                {phone && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b>Телефон:</b> {phone}
                  </Text>
                )}
                {businessType && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b>Тип бизнеса:</b> {businessType}
                  </Text>
                )}

                {cosmetologist && (
                  <Text style={{...paragraph}}>
                    <b>Косметолог:</b> {cosmetologist ? 'Да' : 'Нет'}
                  </Text>
                )}

                {message && (
                  <Text style={paragraph}>
                    <b>Комментарий:</b> {message}
                  </Text>
                )}

                {submissionId && <Text style={paragraph}><b>Номер заявки:</b> {submissionId}</Text>}
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default EmailTemplate

const main = {
  backgroundColor: '#fff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const paragraph = {
  fontSize: 16,
}

const content = {
  border: '1px solid rgb(0,0,0, 0.1)',
  borderRadius: '3px',
  overflow: 'hidden',
}
