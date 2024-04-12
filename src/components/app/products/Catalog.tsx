import {unstable_noStore as noStore} from 'next/cache'

import Link from 'next/link'
import Image from 'next/image'
import {client, urlForImage} from '@/lib/sanity'

interface Product {
  name: string
  article: number
  volume: string
  description: string
  usage: string
  price: number
  gender: string
  body_part: string
  age_group: string
  complexity: string
  ampulsivity: boolean
}

const getData = async (): Promise<Product[]> => {
  noStore()

  const query = `
    *[_type == 'product'] {
        name,
        article,
        volume,
        description,
        usage,
        images,
        price,
        gender,
        body_part,
        age_group,
        complexity,
        ampulsivity,
    }`

  const data: Product[] = await client.fetch(query)
  return data
}

const Program = async () => {
  const products: Product[] = await getData()

  if (!products) {
    return <mark>Произошла ошибка при получении данных!</mark>
  }

  return (
    <section className="grid w-[70%] mx-auto sm:w-full grid-cols-3 sm:grid-cols-1 items-start gap-5 p-5 m-5 mt-20">
      {products.map((program, idx) => (
        <div key={idx} className="flex flex-col justify-between w-full gap-5 p-5 border-2 border-custom-teal group">
          {/* {program.images && program.images.length > 0 && (
            <div className="w-full h-[250px] relative self-center">
              <Image src={urlForImage(program.images[0]).url()} className="object-cover" fill={true} alt={`program 0`} />
            </div>
          )} */}

          <div className="space-y-2">
            <h1 className="text-2xl font-medium">{program.name}</h1>
            <mark>{program.article}</mark>
            <h2 className="underline">{program.volume}</h2>
            <h2 className="line-clamp-3">{program.description}</h2>
            <div className="p-2 border-2 border-custom-teal">
              <h2 className="line-clamp-3">{program.usage}</h2>
            </div>
            <h2 className="underline">{program.price}</h2>
            <h2>{program.gender}</h2>
            <h2>{program.body_part}</h2>
            <h2>{program.age_group}</h2>
            <h2>{program.complexity}</h2>
            <h2>{program.ampulsivity ? 'ампульсивный' : 'не ампульсивный'}</h2>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Program
