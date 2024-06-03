import {urlForImage} from '@/lib/sanity'
import Image from 'next/image'

interface CatalogCardProps {
  item: {
    name: string
    caption: string
    article: number
    slug: {current: string}
    image?: Array<{asset: {url: string}}>
  }
  idx: number
}

const CatalogCard: React.FC<CatalogCardProps> = ({item, idx}) => {
  if (!item.image) return null

  return (
    <article className="flex flex-col justify-between w-full h-full gap-5 p-5 border border-neutral-200 group" key={idx}>
      <div className="h-[200px] w-full relative self-center">
        <Image src={urlForImage(item.image).url()} className="object-contain" fill={true} alt={`item ${idx}`} />
      </div>
      <div className="space-y-2">
        <div>
          <h1 className="text-2xl font-semibold">{item.name}</h1>
          <h1>{item.caption}</h1>
        </div>
        <div className="flex gap-2">
          <div className="border-2 px-1 border-neutral-200 w-fit">{item.article}</div>
          <div className="border-2 px-1 border-neutral-200 w-fit">{item.slug.current}</div>
        </div>
      </div>
    </article>
  )
}

export default CatalogCard
