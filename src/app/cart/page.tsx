import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Корзина',
}

import {type TPromocode, getPromocodes} from '@/lib/get_promocodes'

import Container from '#/Global/Container'
import CartModule from '##/products/Cart/CartModule'

export default async function CartPage() {
  const promocodes: TPromocode[] = await getPromocodes()
  const activePromocodes = promocodes.filter((p) => p.is_enabled === true)

  return (
    <Container>
      <CartModule promocodes={activePromocodes} />
    </Container>
  )
}
