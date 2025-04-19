import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Скидки',
}

import {TProduct, getProducts} from '@/lib/get_products'
import {shuffleArray} from '@/lib/utils'
import {redirect} from 'next/navigation'

import Container from '#/Global/Container'
import Catalog from '##/products/Catalog'
import Title from '#/UI/Title'

const DiscountsPage = async () => {
  const products: TProduct[] = await getProducts()

  if (!products) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const discountedProducts = products.filter((product) => product.discount_price !== null)

  if (discountedProducts.length === 0) {
    return (
      <Container className="w-[80%] xl:w-[90%]" marginBottom={true}>
        <Title text="Нет продуктов на скидке" classes="text-center mb-5" />
        {redirect('/products')}
      </Container>
    )
  }

  return (
    <Container className="w-[80%] xl:w-[90%]" marginBottom={true}>
      <Catalog view="discounts" products={shuffleArray(discountedProducts)} />
    </Container>
  )
}

export default DiscountsPage
