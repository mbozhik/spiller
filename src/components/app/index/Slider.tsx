'use client'

import Image from 'next/image'
import SliderImage1 from '%/slider/1.jpg'
import SliderImage2 from '%/slider/2.jpg'
import SliderImage3 from '%/slider/3.jpg'
import SliderImage4 from '%/slider/4.jpg'
import SliderImage5 from '%/slider/5.jpg'
import SliderImage6 from '%/slider/6.jpg'

import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, Autoplay, EffectFade} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

export default function Slider() {
  const sliderImages = [SliderImage1, SliderImage2, SliderImage3, SliderImage4, SliderImage5, SliderImage6]

  return (
    <Swiper modules={[Pagination, Autoplay, EffectFade]} pagination={{clickable: true}} autoplay={{delay: 3500}} effect={'fade'} grabCursor={true} loop={true} className="mySwiper w-full h-[60vh] xl:h-[65vh] sm:h-[45vh]">
      {sliderImages.map((image, index) => (
        <SwiperSlide className="relative grid place-items-center" key={index}>
          <Image className="absolute inset-0 block object-cover s-full" src={image} alt={`slide-${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
