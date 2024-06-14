import Container from '#/Global/Container'
import Slider from '##/index/Slider'
import Intro from '##/index/Intro'
import Grid from '##/index/Grid'
import Hytec from '#/UI/Hytec'
import Partnership from '##/index/Partnership'

export default function Home() {
  return (
    <>
      <Slider />
      <Container className="mt-10 mb-20 sm:mt-7 space-y-14 sm:space-y-10 sm:mb-14" paddingTop={false}>
        <Intro />
        <Grid />
        <Partnership />
      </Container>
      <Hytec />
    </>
  )
}
