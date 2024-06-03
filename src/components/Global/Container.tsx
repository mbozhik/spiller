import {cn} from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({children, className}: Readonly<ContainerProps>) {
  return <main className={cn('flex-auto mx-auto w-[60%] xl:w-[75%] sm:w-[90%]', className)}>{children}</main>
}
