import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Косметология',
}

import Image from 'next/image'
import CosmetologyImage from '%/slider/3.jpg'

import Container from '#/Global/Container'
import Intro from '##/cosmetology/Intro'

export default function Cosmetology() {
  return (
    <div>
      <section className="relative w-full h-[40vh] sm:h-[30vh]">
        <Image quality={100} priority={true} className="s-full object-top object-cover" src={CosmetologyImage} alt="" />
      </section>
      <Container marginBottom={true} className="space-y-14 sm:space-y-7">
        <Intro />
      </Container>
    </div>
  )
}
