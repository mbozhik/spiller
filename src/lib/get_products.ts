import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

type TProduct = {
  name: string
  caption: string
  article: number
  volume: string

  unavailable: boolean | null

  short_description: any
  full_description: any
  utilization: any
  composition: any

  price: number
  discount_price?: number

  slug: {current: string}
  image?: Array<{asset: {url: string}}>
  more_images?: Array<{asset: {url: string}}>

  main_filter: string
  for_face?: string
  for_body?: string
  product_type: string
  by_intention: string[]
  product_line: string
}

async function getProducts(): Promise<TProduct[]> {
  const data = await client.fetch<TProduct>(
    `*[_type == 'product' && slug.current != null && image != null] {
        name,
        caption,
        article,
        volume,

        unavailable,

        short_description,
        full_description,
        utilization,
        composition,

        price,
        discount_price,

        slug,
        image,
        more_images,

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

export {type TProduct, getProducts}
