// import {compareParams, productParams} from '@/lib/categorize_products'

import {urlForImage} from '@/lib/sanity'
import {TProduct} from '@/lib/get_products'

import Link from 'next/link'
import Image from 'next/image'
import CartButton from '##/products/Cart/CartButton'
import {buttonVariants} from '#/UI/Button'

interface CatalogCardProps {
  item: TProduct
  idx: number
}

const CatalogCard: React.FC<CatalogCardProps> = ({item, idx}) => {
  const cardHref = `/products/${item.slug.current}`

  const noItem = item.unavailable

  return (
    <article className="flex flex-col justify-between w-full h-full gap-5 p-5 border border-neutral-200 group" key={idx}>
      <Link className="h-[250px] xl:h-[200px] w-full relative self-center" href={cardHref}>
        <Image unoptimized src={urlForImage(item.image).url()} className="object-contain" sizes="40vw" fill={true} alt={`item ${idx}`} />
      </Link>

      <Link className="space-y-1" href={cardHref}>
        <h1 className="text-2xl font-semibold">{item.name}</h1>
        <h1 className="text-custom-grey2">{item.caption}</h1>
      </Link>

      {!noItem ? (
        <div className="flex items-center justify-between">
          <CartButton product={item} className="text-base" />

          {item.discount_price ? (
            <div className="flex flex-col sm:gap-0.5 justify-end">
              <div className="flex gap-2 justify-end items-end">
                <span className="text-base leading-none text-right line-through font-medium text-custom-blue/50">{item.price}</span>

                <span className="text-lg leading-none font-medium text-custom-blue/50">-{Math.round(((item.price - item.discount_price) / item.price) * 100)}%</span>
              </div>

              <h1 className="text-2xl text-right font-medium text-custom-blue">{item.discount_price} тг</h1>
            </div>
          ) : (
            <h1 className="text-2xl font-medium text-custom-blue">{item.price} тг</h1>
          )}
          {/* <div className={`text-base w-full hover:bg-white hover:!text-custom-blue hover:cursor-default ${buttonVariants.default} ${buttonVariants.primary}`}>Обновляем цены</div> */}
        </div>
      ) : (
        <div className={`text-base w-full hover:bg-white hover:!text-custom-blue hover:cursor-default ${buttonVariants.default} ${buttonVariants.primary}`}>Нет в наличии</div>
      )}

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
