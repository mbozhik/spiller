import {client} from '@/lib/sanity'
import {revalidateOnTime} from '@/lib/utils'

export type TProcedure = {
  name: string
  caption: string
  price: string
  category: string
}

export async function getProcedures(): Promise<TProcedure[]> {
  const data = await client.fetch<TProcedure>(
    `*[_type == 'procedure'] {
        name,
        caption,
        price,
        category,
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
