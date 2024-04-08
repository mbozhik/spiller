import {Metadata} from 'next'
export const metadata: Metadata = {
  title: 'Где купить',
}

import Main from '#/UI/Container'
import Grid from '##/buy/Grid'
import Contacts from '##/buy/Contacts'
import Map from '##/buy/Map'

export default function Buy() {
  return (
    <Main>
      <div className="flex flex-col gap-16 mt-16 mb-44 sm:mb-24">
        <Grid />
        <Contacts />
        <Map />
      </div>
    </Main>
  )
}
