import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Продукты',
}

import ProductsBody from '##/products/Body'

export default function Products() {
  return <ProductsBody />
}
