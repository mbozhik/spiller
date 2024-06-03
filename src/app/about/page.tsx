import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'О бренде',
}

import Image, {StaticImageData} from 'next/image'
import AboutImage from '%/about/1.jpg'
import AboutImage2 from '%/about/2.jpg'
import AboutImage3 from '%/about/3.jpg'

import Container from '#/Global/Container'
import Title from '#/UI/Title'

const divisionData: {[key: number]: {text: string; href: string; image: string | StaticImageData}} = {
  1: {
    text: 'История компании',
    href: '/about/history/',
    image: AboutImage,
  },
  2: {
    text: 'HYTEC',
    href: '/about/hytec/',
    image: AboutImage2,
  },
  3: {
    text: 'Награды',
    href: '/about/awards/',
    image: AboutImage3,
  },
}

export default function About() {
  return (
    <Container marginBottom={true} className="space-y-10">
      <Title text="Разделы" classes="normal-case" />

      <section data-section="DIVISION" className="grid grid-cols-2 gap-3 sm:gap-5 sm:grid-cols-1">
        {Object.values(divisionData).map(({text, href, image}) => (
          <a key={text} href={href} className="relative overflow-hidden group">
            <Image className="block object-cover duration-500 s-full group-hover:scale-105" src={image} alt="" />
            <div className="absolute bottom-0 w-[97%] sm:w-[94%] p-4 sm:py-2 m-2 bg-white/90 group-hover:bg-white duration-300">
              <h1 className="text-2xl sm:text-lg">{text}</h1>
            </div>
          </a>
        ))}
      </section>
    </Container>
  )
}
