import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Скидки',
}

import {TProduct, getProducts} from '@/lib/get_products'
import {shuffleArray} from '@/lib/utils'

import Container from '#/Global/Container'
import Catalog from '##/products/Catalog'

const DiscountsPage = async () => {
  const products: TProduct[] = await getProducts()

  if (!products) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  const discountedProducts = products.filter((product) => product.discount_price !== null)
  // console.log(`products ${products.length} discounts ${discountedProducts.length}`)

  return (
    <Container className="w-[80%] xl:w-[90%]" marginBottom={true}>
      <Catalog products={shuffleArray(discountedProducts)} />
    </Container>
  )
}

export default DiscountsPage
