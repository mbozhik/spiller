import {NextResponse} from 'next/server'
import {getProducts} from '@/lib/get_products'
import {generateXML} from '@/lib/feed'

export async function GET() {
  try {
    const products = await getProducts()
    const xml = generateXML(products)

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({error: 'Failed to generate feed'}, {status: 500})
  }
}
