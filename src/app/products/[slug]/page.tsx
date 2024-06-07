import {client, urlForImage} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

import {Product} from '@/app/products/page' // interface (types)

import Image from 'next/image'
import Container from '#/Global/Container'
import Title from '#/UI/Title'
import Text from '#/UI/Text'
import Button from '#/UI/Button'
import {NumberInput} from '@/components/app/products/NumberInput'

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
    <Container className="mt-5 w-[70%]" marginBottom={true}>
      <article className={`flex items-center gap-10 sm:gap-5`}>
        <div className={`relative h-full w-[50vw] aspect-[3/2]`}>
          <Image quality={100} className="object-contain w-full h-full" src={urlForImage(product.image).url()} fill={true} sizes="40vw" alt={`${product.name}`} />
        </div>

        <div className="w-[60%] space-y-5">
          <div className="space-y-2">
            <mark>Dr. Spiller</mark>
            <Title text={product.name} />
          </div>

          <Text text={product.description} />

          <div className="flex flex-col gap-2">
            {/* <NumberInput /> */}
            <h2 className="text-3xl font-medium">{product.price} тг</h2>
            <Button text="В корзину" classes="text-base px-20" variant="secondary" />
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
