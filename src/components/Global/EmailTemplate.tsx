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
