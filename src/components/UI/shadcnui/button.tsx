'use client'

import {Button as ButtonPrimitive} from '@base-ui/react/button'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '@/lib/utils'

const buttonVariants = cva("rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none", {
  variants: {
    variant: {
      default: 'bg-custom-blue text-white hover:bg-custom-blue/80 focus-visible:border-custom-hytec focus-visible:ring-custom-hytec/50',
      outline: 'border-custom-grey bg-white hover:bg-custom-nav hover:text-custom-grey focus-visible:border-custom-hytec focus-visible:ring-custom-hytec/50 aria-expanded:bg-custom-nav aria-expanded:text-custom-grey',
      secondary: 'bg-custom-grey text-white hover:bg-custom-grey/80 focus-visible:border-custom-hytec focus-visible:ring-custom-hytec/50 aria-expanded:bg-custom-grey aria-expanded:text-white',
      ghost: 'hover:bg-custom-nav hover:text-custom-grey focus-visible:border-custom-hytec focus-visible:ring-custom-hytec/50 aria-expanded:bg-custom-nav aria-expanded:text-custom-grey',
      destructive: 'bg-red-100 hover:bg-red-200 focus-visible:ring-red-200 text-red-700 focus-visible:border-red-300',
      link: 'text-custom-blue underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
      xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
      lg: 'h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
      icon: 'size-8',
      'icon-xs': "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
      'icon-sm': 'size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg',
      'icon-lg': 'size-9',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

function Button({className, variant = 'default', size = 'default', ...props}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({variant, size, className}))} {...props} />
}

export {Button, buttonVariants}
