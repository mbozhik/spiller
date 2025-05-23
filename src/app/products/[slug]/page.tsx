import {Metadata} from 'next'

type Props = {
  params: Promise<{slug: string}>
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {slug} = await params
  const product: TProduct = await getData(slug).catch(() => null)

  return {
    title: `${product.name}`,
    description: `${product.name} — ${product.short_description}`,
  }
}

import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import {TProduct} from '@/lib/get_products'

import Image from 'next/image'
import Container from '#/Global/Container'
import Title from '#/UI/Title'
import Text from '#/UI/Text'
import PortableText from '#/UI/PortableText'
import ProductInfo from '##/products/ProductInfo'
import ProductBack from '##/products/ProductBack'
import CartButton from '##/products/Cart/CartButton'
import {buttonVariants} from '#/UI/Button'

async function getData(slug): Promise<TProduct | null> {
  const data = await client.fetch<TProduct>(
    `*[_type == 'product' && slug.current == '${slug}'][0] {
        name,
        caption,
        article,
        volume,

        unavailable,

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
  const product: TProduct = await getData(params.slug)

  if (!product) {
    return <mark>ошибка</mark>
  }

  const noProduct = product.unavailable

  return (
    <Container className="w-[70%] xl:w-[80%]" marginBottom={true}>
      <ProductBack />

      <article className={`flex items-center sm:flex-col gap-10 sm:gap-5 mb-[10vh] sm:mb-[7vh]`}>
        <div className={`w-[20vw] xl:w-[25vw] sm:w-[50vw] mx-auto`}>
          <Image quality={100} className="object-contain s-full" src={urlForImage(product.image).url()} width={700} height={700} alt={`${product.name}`} />
        </div>

        <div className="space-y-5 sm:space-y-3 w-[50%] xl:w-[55%] sm:w-full">
          <div className="space-y-3">
            <mark>Dr. Spiller</mark>
            <div className="space-y-0">
              <Title text={product.name} />
              <span className="block text-lg border-b-[1px] border-custom-blue w-fit font-medium text-custom-blue">{product.caption}</span>
            </div>

            <PortableText value={product.short_description} />
          </div>

          {!noProduct ? (
            <div className="flex flex-col gap-4 text-custom-blue">
              {product.discount_price ? (
                <div className="flex flex-col gap-0.5 sm:gap-1.5 items-start">
                  <div className="flex gap-2 justify-end items-end">
                    <span className="text-base leading-none text-right line-through font-medium text-custom-blue/50">{product.price}</span>

                    <span className="text-xl leading-none font-medium text-custom-blue/50">-{Math.round(((product.price - product.discount_price) / product.price) * 100)}%</span>
                  </div>

                  <h1 className="text-3xl text-right font-medium text-custom-blue">{product.discount_price} тг</h1>
                </div>
              ) : (
                <h2 className="text-3xl font-medium">{product.price} тг</h2>
              )}
              <CartButton product={product} className="px-20 text-base sm:!w-full" />
            </div>
          ) : (
            <div className={`text-base hover:bg-white hover:!text-custom-blue hover:cursor-default ${buttonVariants.default} ${buttonVariants.primary}`}>Нет в наличии</div>
          )}

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
