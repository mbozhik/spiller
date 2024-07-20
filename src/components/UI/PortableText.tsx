import {PortableText} from '@portabletext/react'
import {cn} from '@/lib/utils'

interface Props {
  value: any
  prose?: boolean
  className?: string
}

const PortableBlock: React.FC<Props> = ({value, prose = false, className}) => {
  return (
    <div className={cn(`tracking-[-0.010em] space-y-2.5 ${prose ? 'prose' : ''}`, className)}>
      <PortableText value={value} />
    </div>
  )
}

export default PortableBlock
