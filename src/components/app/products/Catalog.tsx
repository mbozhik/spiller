import {unstable_noStore as noStore} from 'next/cache'

import Link from 'next/link'
import Image from 'next/image'
import {client, urlForImage} from '@/lib/sanity'

import {compareCategory, categoryTitles} from '@/lib/categories'

interface Product {
  name: string
  caption: string
  article: number
  volume: string
  description: string
  usage: string
  image: Array<{asset: {url: string}}>
  price: number
  gender: string
  body_part: string
  age_group: string
  skin_type: string
  problem_action: string
  product_type: string
  slug: string
  [x: string]: any
}

const getData = async (): Promise<Product[]> => {
  noStore()

  const query = `
    *[_type == 'product' && slug.current != null] {
        name,
        caption,
        article,
        volume,
        description,
        usage,
        image,
        price,
        gender,
        body_part,
        age_group,
        skin_type,
        problem_action,
        product_type,
        slug,
    }`

  const data: Product[] = await client.fetch(query)
  return data
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
          <div className="h-[200px] w-full relative self-center">
            <Image src={urlForImage(item.image).url()} className="object-contain" fill={true} alt={`item 0`} />
          </div>

          <div className="space-y-2">
            <div className="border-2 px-1 border-neutral-200 w-fit">{item.article}</div>
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            <h1>{item.caption}</h1>
            <h2 className="underline">{item.volume}</h2>
            <h2 className="underline">{item.price} тенге</h2>

            <div className="flex flex-wrap gap-1">
              {Object.keys(categoryTitles).map((category, idx) =>
                // utility function to compare category value with title
                compareCategory(category, item[category], idx),
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Catalog
