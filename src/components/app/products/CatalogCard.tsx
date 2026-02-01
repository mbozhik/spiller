// import {compareParams, productParams} from '@/lib/categorize_products'

import {urlForImage} from '@/lib/sanity'
import {TProduct} from '@/lib/get_products'

import {useState, useRef, useCallback, useEffect} from 'react'

import Link from 'next/link'
import Image from 'next/image'
import CartButton from '##/products/Cart/CartButton'
import {buttonVariants} from '#/UI/Button'
import {Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext} from '#/UI/shadcnui/carousel'

interface CatalogCardProps {
  item: TProduct
  idx: number
}

const CatalogCard: React.FC<CatalogCardProps> = ({item, idx}) => {
  const cardHref = `/products/${item.slug.current}`

  const noItem = item.unavailable

  const [emblaApi, setEmblaApi] = useState<any>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null)

  const hasMultipleImages = item.more_images && item.more_images.length > 0
  const totalImages = hasMultipleImages ? item.more_images.length + 1 : 1

  const startAutoScroll = useCallback(() => {
    if (emblaApi && hasMultipleImages) {
      autoScrollRef.current = setInterval(() => {
        emblaApi.scrollNext()
        setActiveIndex((prev) => (prev + 1) % totalImages)
      }, 750) // прокрутка каждые 0.75 секунды
    }
  }, [emblaApi, hasMultipleImages, totalImages])

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current)
      autoScrollRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isHovered) {
      setActiveIndex(0) // сбрасываем на первое изображение при наведении
      startAutoScroll()
    } else {
      stopAutoScroll()
    }

    return () => stopAutoScroll()
  }, [isHovered, startAutoScroll, stopAutoScroll])

  useEffect(() => {
    return () => stopAutoScroll()
  }, [stopAutoScroll])

  return (
    <article data-item="card-catalog-products" data-card-id={item.slug.current} className="flex flex-col justify-between w-full h-full gap-5 p-5 border border-neutral-200 group" key={idx} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link className="h-[250px] xl:h-[200px] w-full relative self-center" href={cardHref}>
        {item.more_images && item.more_images.length > 0 ? (
          <div className="w-full h-full relative">
            <Carousel className="w-full h-full" setApi={setEmblaApi} opts={{loop: true}}>
              <CarouselContent>
                <CarouselItem className="relative">
                  <Image unoptimized src={urlForImage(item.image).url()} className="object-contain" sizes="40vw" fill={true} alt={`item ${idx}`} />
                </CarouselItem>
                {item.more_images.map((img, idx) => (
                  <CarouselItem key={idx} className="h-full relative">
                    <Image unoptimized src={urlForImage(img).url()} className="object-contain" sizes="40vw" fill={true} alt={`${item.name} ${idx + 1}`} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Индикаторные точки с активной подсветкой */}
            {hasMultipleImages && (
              <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {Array.from({length: totalImages}, (_, index) => (
                  <div
                    key={index}
                    className={`size-[7px] rounded-full duration-300 ${
                      index === activeIndex
                        ? 'bg-custom-blue/70 scale-110' // active
                        : 'bg-custom-blue/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <Image unoptimized src={urlForImage(item.image).url()} className="object-contain" sizes="40vw" fill={true} alt={`item ${idx}`} />
        )}
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
