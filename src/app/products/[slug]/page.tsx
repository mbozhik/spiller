import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import {Product} from '@/app/products/page' // types

import Image from 'next/image'
import Container from '#/Global/Container'
import Title from '#/UI/Title'
import Text from '#/UI/Text'
import CartButton from '##/products/[slug]/CartButton'

async function getData(slug): Promise<Product | null> {
  const data = await client.fetch<Product>(
    `*[_type == 'product' && slug.current == '${slug}'][0] {
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
  return data
}

const ProductPage = async ({params}) => {
  const product: Product = await getData(params.slug)

  if (!product) {
    return <mark>ошибка</mark>
  }

  return (
    <Container className="w-[70%] xl:w-[80%] sm:w" marginBottom={true}>
      <article className={`flex items-center sm:flex-col gap-10 sm:gap-5`}>
        <div className={`w-[20vw] xl:w-[25vw] sm:w-[50vw] mx-auto`}>
          <Image quality={100} className="object-contain" src={urlForImage(product.image).url()} width={700} height={700} alt={`${product.name}`} />
        </div>

        <div className="space-y-5 sm:space-y-2 w-[50%] xl:w-[55%] sm:w-full">
          <div className="space-y-2">
            <mark>Dr. Spiller</mark>
            <Title text={product.name} />
          </div>

          <Text text={product.description} />

          <div className="flex flex-col gap-4 text-custom-blue">
            <h2 className="text-3xl font-medium">{product.price} тг</h2>
            <CartButton product={product} className="text-base px-20" />
          </div>

          <div className="flex gap-3">
            <Text text={`Артикул: <b>${product.article}</b>`} />
            <Text text={`Объем: <b>${product.volume}</b>`} />
          </div>
        </div>
      </article>
    </Container>
  )
}

export default ProductPage
