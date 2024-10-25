import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Продукты',
}

import {TProduct, getProducts} from '@/lib/get_products'
import {shuffleArray} from '@/lib/utils'

import Container from '#/Global/Container'
import Catalog from '##/products/Catalog'

const ProductsPage = async () => {
  const products: TProduct[] = await getProducts()

  if (!products) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <Container className="w-[80%] xl:w-[90%]" marginBottom={true}>
      <Catalog products={shuffleArray(products)} />
    </Container>
  )
}

export default ProductsPage
