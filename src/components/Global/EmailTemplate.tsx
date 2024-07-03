import * as React from 'react'

interface EmailTemplateProps {
  message: string
  email: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({email, message}) => (
  <div>
    <h1>Welcome, {email}!</h1>
    <p>{message}</p>
  </div>
)
