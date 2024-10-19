import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import {Product} from '@/app/products/page' // types

import Image from 'next/image'
import Container from '#/Global/Container'
import Title from '#/UI/Title'
import Text from '#/UI/Text'
import PortableText from '#/UI/PortableText'
import ProductInfo from '##/products/ProductInfo'
import ProductBack from '##/products/ProductBack'
import CartButton from '##/products/Cart/CartButton'

async function getData(slug): Promise<Product | null> {
  const data = await client.fetch<Product>(
    `*[_type == 'product' && slug.current == '${slug}'][0] {
        name,
        caption,
        article,
        volume,

        short_description,
        full_description,
        utilization,
        composition,

        usage,
        price,
        discount_price,
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
    <Container className="w-[70%] xl:w-[80%]" marginBottom={true}>
      <ProductBack />

      <article className={`flex items-center sm:flex-col gap-10 sm:gap-5 mb-[10vh] sm:mb-[7vh]`}>
        <div className={`w-[20vw] xl:w-[25vw] sm:w-[50vw] mx-auto`}>
          <Image quality={100} className="object-contain s-full" src={urlForImage(product.image).url()} width={700} height={700} alt={`${product.name}`} />
        </div>

        <div className="space-y-5 sm:space-y-3 w-[50%] xl:w-[55%] sm:w-full">
          <div className="space-y-2">
            <mark>Dr. Spiller</mark>
            <Title text={product.name} />

            <PortableText value={product.short_description} />
          </div>

          <div className="flex flex-col gap-4 text-custom-blue">
            {product.discount_price ? (
              <div className="flex items-end gap-1.5">
                <h2 className="text-lg font-medium line-through text-custom-blue/50">{product.price}</h2>
                <h2 className="text-3xl font-medium">{product.discount_price} тг</h2>
              </div>
            ) : (
              <h2 className="text-3xl font-medium">{product.price} тг</h2>
            )}
            <CartButton product={product} className="px-20 text-base sm:!w-full" />
          </div>

          <div className="flex gap-3 sm:!mt-3">
            <Text text={`Артикул: <b>${product.article}</b>`} />
            <Text text={`Объем: <b>${product.volume}</b>`} />
          </div>
        </div>
      </article>

      <ProductInfo product={product} />
    </Container>
  )
}

export default ProductPage
