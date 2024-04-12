import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Продукты',
}

import Catalog from '##/products/Catalog'

export default function Products() {
  return <Catalog />
}
