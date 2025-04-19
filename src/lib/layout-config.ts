import type {Metadata} from 'next'
import {Open_Sans} from 'next/font/google'

export const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Dr. Spiller',
    default: 'Dr. Spiller',
  },
  description: 'Сохранить здоровье и молодость - главная задача для Dr. Spiller! Профессиональная уходовая косметика премиального уровня из Германии, известная во всём мире. ТОО "WEC GROUP" является официальным дистрибьютором косметики Dr. Spiller в Казахстане и Кыргызстанe',
  keywords: 'dr spiller, доктор шпиллер, доктор шпиллер казахстан, косметика казахстан, косметика кыргыстан, немецкая косметика, профессиональная немецкая косметика, уходовая косметика, натуральная косметика, дерматологическая косметика, увлажняющий крем, антивозрастная косметика, органическая косметика, лечение акне, уход за кожей, косметика для лица',
  openGraph: {
    images: 'https://dr-spiller.kz' + '/og.png',
  },
}
