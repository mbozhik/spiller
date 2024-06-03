import Container from '#/Global/Container'
import Slider from '##/index/Slider'
import Intro from '##/index/Intro'
import Grid from '##/index/Grid'
import Hytec from '#/UI/Hytec'

export default function Home() {
  return (
    <>
      <Slider />
      <Container paddingTop={false}>
        <Intro />
        <Grid />
      </Container>
      <Hytec />
    </>
  )
}
