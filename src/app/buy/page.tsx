import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Где купить',
}

import Container from '#/Global/Container'
import Grid from '##/buy/Grid'
import Contacts from '##/buy/Contacts'
import Map from '##/buy/Map'

export default function Buy() {
  return (
    <Container className="space-y-16 sm:space-y-10">
      <Grid />
      <Contacts />
      <Map />
    </Container>
  )
}
