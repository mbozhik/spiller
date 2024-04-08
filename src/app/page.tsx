import Main from '#/UI/Container'
import Slider from '##/index/Slider'
import Intro from '##/index/Intro'
import Grid from '##/index/Grid'
import Hytec from '#/UI/Hytec'

export default function Home() {
  return (
    <>
      <Slider />
      <Main>
        <Intro />
        <Grid />
      </Main>
      <Hytec />
    </>
  )
}
