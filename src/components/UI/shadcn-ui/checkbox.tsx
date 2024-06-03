'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import {Check} from 'lucide-react'

import {cn} from '@/lib/utils'

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(({className, ...props}, ref) => (
  <CheckboxPrimitive.Root ref={ref} className={cn('peer flex h-4 w-4 shrink-0 rounded-sm border border-custom-blue focus-visible:border ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-custom-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-custom-blue data-[state=checked]:text-slate-50', className)} {...props}>
    <CheckboxPrimitive.Indicator className={cn('grid place-items-center text-white')}>
      <Check className="w-4 h-4 pr-[1px]" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export {Checkbox}
