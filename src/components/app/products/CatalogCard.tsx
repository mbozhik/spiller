// import {compareParams, productParams} from '@/lib/categorize_products'

import {urlForImage} from '@/lib/sanity'

import Image from 'next/image'
import Button from '#/UI/Button'
import CartButton from '##/products/[slug]/CartButton'
import {Product} from '@/app/products/page'

interface CatalogCardProps {
  item: Product
  idx: number
}

const CatalogCard: React.FC<CatalogCardProps> = ({item, idx}) => {
  if (!item.image) return null

  return (
    <article className="flex flex-col justify-between w-full h-full gap-5 p-5 border border-neutral-200 group" key={idx}>
      <div className="h-[250px] xl:h-[200px] w-full relative self-center">
        <Image src={urlForImage(item.image).url()} className="object-contain" sizes="40vw" fill={true} alt={`item ${idx}`} />
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{item.name}</h1>
        <h1 className="text-custom-grey2">{item.caption}</h1>
      </div>

      <div className="grid w-full grid-cols-2 gap-2">
        <Button text="Подробнее" classes="text-base w-full" href={`/products/${item.slug.current}`} />
        <CartButton product={item} className="text-base w-full block" />
      </div>

      {/* <div className="flex flex-wrap gap-1">
        {Object.keys(productParams).map((param, idx) =>
          // utility function to compare params value with title
          compareParams(param, item[param], idx),
        )}
      </div> */}
    </article>
  )
}

export default CatalogCard
