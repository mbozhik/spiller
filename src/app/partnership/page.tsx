import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Сотрудничество',
}

import Container from '#/Global/Container'
import Intro from '##/partnership/Intro'

export default function About() {
  return (
    <Container marginBottom={true} className="space-y-14 sm:space-y-5">
      <Intro />
    </Container>
  )
}
