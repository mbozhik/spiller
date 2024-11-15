import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Косметология',
}

import Container from '#/Global/Container'
import Intro from '##/partnership/Intro'

export default function Cosmetology() {
  return (
    <Container marginBottom={true} className="space-y-14 sm:space-y-7">
      <Intro />
    </Container>
  )
}
