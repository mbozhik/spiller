import {cn} from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  paddingTop?: boolean
  marginBottom?: boolean
}

export default function Container({children, className, paddingTop = true, marginBottom}: Readonly<ContainerProps>) {
  const containerStyles = `${paddingTop && 'pt-14'} ${marginBottom && 'mb-44 sm:mb-24'}`

  return <main className={cn('flex-auto mx-auto w-[60%] xl:w-[75%] sm:w-[90%]', containerStyles, className)}>{children}</main>
}
