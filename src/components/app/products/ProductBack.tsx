'use client'

import {MoveLeft} from 'lucide-react'

export default function ProductBack() {
  const handleBackNavigation = (e) => {
    e.preventDefault()
    const {referrer} = document
    referrer && new URL(referrer).hostname === window.location.hostname ? window.history.back() : (window.location.href = '/products')
  }

  return (
    <a href="#" className="flex items-center gap-2 text-lg duration-200 text-primary hover:text-primary-hover group w-fit" onClick={handleBackNavigation}>
      <MoveLeft className="duration-200 group-hover:-translate-x-1" strokeWidth={1.5} /> Назад
    </a>
  )
}
