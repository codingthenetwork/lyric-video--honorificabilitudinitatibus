import { makeScene2D, Layout, Txt } from '@motion-canvas/2d'
import { waitFor } from '@motion-canvas/core'

const foreground = '#fcfcfcff';
const midgroundF = '#808080ff';
const midgroundB = '#272727ff';
const background = '#000000ff';

export default makeScene2D(function* (view){
    view.add(
        <Layout layout direction={'column'} justifyContent={'center'} gap={20}>
            <Txt fontFamily={'Roboto Mono'} fontSize={30} fill={midgroundF}>made by</Txt>
            <Txt fontFamily={'Roboto Mono'} fontSize={30} fill={midgroundF}>@extrasauce</Txt>
        </Layout>
    )

    yield* waitFor(3)
})