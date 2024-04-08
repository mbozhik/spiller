import Main from '#/UI/Container'
import Grid from '@/components/app/buy/Grid'
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
