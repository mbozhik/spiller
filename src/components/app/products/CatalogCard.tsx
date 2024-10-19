// import {compareParams, productParams} from '@/lib/categorize_products'

import {urlForImage} from '@/lib/sanity'

import Link from 'next/link'
import Image from 'next/image'
import CartButton from '##/products/Cart/CartButton'
import {Product} from '@/app/products/page'

interface CatalogCardProps {
  item: Product
  idx: number
}

const CatalogCard: React.FC<CatalogCardProps> = ({item, idx}) => {
  const cardHref = `/products/${item.slug.current}`

  return (
    <article className="flex flex-col justify-between w-full h-full gap-5 p-5 border border-neutral-200 group" key={idx}>
      <Link className="h-[250px] xl:h-[200px] w-full relative self-center" href={cardHref}>
        <Image src={urlForImage(item.image).url()} className="object-contain" sizes="40vw" fill={true} alt={`item ${idx}`} />
      </Link>

      <Link className="space-y-1" href={cardHref}>
        <h1 className="text-2xl font-semibold">{item.name}</h1>
        <h1 className="text-custom-grey2">{item.caption}</h1>
      </Link>

      <div className="flex items-center justify-between">
        <CartButton product={item} className="text-base" />

        {item.discount_price ? (
          <div className="flex items-end gap-1.5">
            <h1 className="text-lg font-medium line-through text-custom-blue/50">{item.price}</h1>
            <h1 className="text-2xl font-medium text-custom-blue">{item.discount_price} тг</h1>
          </div>
        ) : (
          <h1 className="text-2xl font-medium text-custom-blue">{item.price} тг</h1>
        )}
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
