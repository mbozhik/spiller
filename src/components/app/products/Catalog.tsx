import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import Container from '#/UI/Container'
import CatalogCard from '##/products/CatalogCard'

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
          {filteredProducts.map((item, idx) => (
            <CatalogCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      </section>
    </Container>
  )
}

export default Catalog
