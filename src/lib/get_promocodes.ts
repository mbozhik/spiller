import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

export type TPromocode = {
  is_enabled: boolean | null
  code: string
  discount: number
}

export async function getPromocodes(): Promise<TPromocode[]> {
  const data = await client.fetch<TPromocode>(
    `*[_type == 'promocode'] {
        is_enabled,
        code,
        discount,
    }`,
    {},
    {
      next: {
        revalidate: revalidateOnTime,
      },
    },
  )
  return Array.isArray(data) ? data : []
}
