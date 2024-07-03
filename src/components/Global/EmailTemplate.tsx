import {Body, Container, Column, Head, Heading, Html, Preview, Row, Section, Text} from '@react-email/components'
import * as React from 'react'

interface EmailTemplateProps {
  subject: string
  email: string

  name?: string
  naming?: string
  city?: string
  phone?: string
  businessType?: string
  message?: string
}

export const EmailTemplate = ({subject, email, name, naming, city, phone, businessType, message}: EmailTemplateProps) => {
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

                {name && (
                  <Text style={{...paragraph}}>
                    <b style={b}>Имя:</b> {name}
                  </Text>
                )}
                {naming && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b style={b}>Компания:</b> {naming}
                  </Text>
                )}
                {city && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b style={b}>Город:</b> {city}
                  </Text>
                )}
                {email && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b style={b}>E-mail:</b> {email}
                  </Text>
                )}
                {phone && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b style={b}>Телефон:</b> {phone}
                  </Text>
                )}
                {businessType && (
                  <Text style={{...paragraph, marginTop: -5}}>
                    <b style={b}>Тип бизнеса:</b> {businessType}
                  </Text>
                )}

                <Text style={paragraph}>{message}</Text>
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

const b = {
  fontWeight: 'medium',
}
