import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Продукты',
}

import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import {shuffleArray} from '@/lib/utils'

import Container from '#/Global/Container'
import Catalog from '##/products/Catalog'

export interface Product {
  name: string
  caption: string
  article: number
  volume: string

  short_description: any
  full_description: any
  utilization: any
  composition: any

  price: number
  slug: {current: string}
  image?: Array<{asset: {url: string}}>
  main_filter: string
  for_face?: string
  for_body?: string
  product_type: string
  by_intention: string[]
  product_line: string
}

async function getData(): Promise<Product[]> {
  const data = await client.fetch<Product>(
    `*[_type == 'product' && slug.current != null && image != null] {
        name,
        caption,
        article,
        volume,
        description,
        usage,
        price,
        slug,
        image,
        main_filter,
        for_face,
        for_body,
        product_type,
        by_intention,
        product_line,
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return Array.isArray(data) ? data : []
}

const ProductsPage = async () => {
  const products: Product[] = await getData()

  if (!products) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <Container className="w-[80%] xl:w-[90%]" marginBottom={true}>
      <Catalog products={shuffleArray(products)} />
    </Container>
  )
}

export default ProductsPage
