import {client, urlForImage} from '@/lib/sanity'
import {compareParams, productParams} from '@/lib/product_params'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'

interface Product {
  name: string
  caption: string
  article: number
  volume: string
  description: string
  usage: string
  price: number
  slug: {current: string}
  image?: Array<{asset: {url: string}}>
  main_filter: string
  for_face?: string
  for_body?: string
  product_type: string
  by_intention: string
  product_line: string
  [x: string]: any
}

async function getData(): Promise<Product[]> {
  const data = await client.fetch<Product>(
    `*[_type == 'product' && slug.current != null] {
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

const Catalog = async () => {
  const products: Product[] = await getData()

  if (!products) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <section className="grid w-[70%] mx-auto sm:w-full grid-cols-3 sm:grid-cols-1 items-start gap-5 p-5 m-5 mt-20">
      {products.map((item, idx) => (
        <div key={idx} className="flex flex-col justify-between w-full h-full gap-5 p-5 border-2 border-neutral-200  group">
          {item.image && (
            <div className="h-[200px] w-full relative self-center">
              <Image src={urlForImage(item.image).url()} className="object-contain" fill={true} alt={`item 0`} />
            </div>
          )}

          <div className="space-y-2">
            <div>
              <h1 className="text-2xl font-semibold">{item.name}</h1>
              <h1>{item.caption}</h1>
            </div>
            <h2 className="underline">{item.volume}</h2>
            <h2 className="underline">{item.price} тенге</h2>
            <div className="flex gap-2">
              <div className="border-2 px-1 border-neutral-200 w-fit">{item.article}</div>
              <div className="border-2 px-1 border-neutral-200 w-fit">{item.slug.current}</div>
            </div>

            <div className="flex flex-wrap gap-1">
              {Object.keys(productParams).map((param, idx) =>
                // utility function to compare params value with title
                compareParams(param, item[param], idx),
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Catalog
