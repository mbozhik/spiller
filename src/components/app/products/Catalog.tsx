import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Image from 'next/image'
import Container from '#/UI/Container'

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
  by_intention: string[]
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

  const gridConfig = {
    global: 'grid-cols-10',
    filters: 'col-span-2',
    grid: 'col-span-8',
  }

  const filteredProducts = products.filter((product) => !product.article.toString().startsWith('2'))

  return (
    <Container className="w-[80%]">
      <section data-section="products" className={`grid mt-20 w-full ${gridConfig.global}`}>
        <div data-section="filters-products" className={gridConfig.filters}>
          <mark>Фильтрация</mark>
        </div>

        <div data-section="grid-products" className={`grid grid-cols-3 sm:grid-cols-1 gap-3 ${gridConfig.grid}`}>
          {filteredProducts.map((item, idx) => {
            if (!item.image) return null

            return (
              <div className="flex flex-col justify-between w-full h-full gap-5 p-5 border border-neutral-200 group " key={idx}>
                <div className="h-[200px] w-full relative self-center">
                  <Image src={urlForImage(item.image).url()} className="object-contain" fill={true} alt={`item ${idx}`} />
                </div>
                <div className="space-y-2">
                  <div>
                    <h1 className="text-2xl font-semibold">{item.name}</h1>
                    <h1>{item.caption}</h1>
                  </div>
                  <div className="flex gap-2">
                    <div className="border-2 px-1 border-neutral-200 w-fit">{item.article}</div>
                    <div className="border-2 px-1 border-neutral-200 w-fit">{item.slug.current}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </Container>
  )
}

export default Catalog
