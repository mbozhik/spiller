export {metadata} from '@/lib/layout-config'
import {openSans} from '@/lib/layout-config'
import './globals.css'

import Analytics from '#/Global/Analytics'
import MetaPixel from '#/Global/MetaPixel'

import Header from '#/Global/Header/Header'
import Footer from '#/Global/Footer'
import CartWidget from '##/products/Cart/CartWidget'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="h-full scroll-smooth">
      <Analytics />
      <MetaPixel />
      <body className={`h-full text-custom-grey relative ${openSans.className}`}>
        <section className="flex flex-col min-h-full">
          <Header />
          {children}
          <Footer />

          <CartWidget />
        </section>
      </body>
    </html>
  )
}
