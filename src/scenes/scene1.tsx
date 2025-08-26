import { makeScene2D, Layout, Circle, CircleProps} from '@motion-canvas/2d'
import { makeRef, createRef, waitFor, Reference, all, chain } from '@motion-canvas/core'

const background = 'black';
const colorss = 'red';
const midgroundF = '#494949ff';
const midgroundB = '#c2c2c2ff';
const foreground = 'white';
    const circleStyle: CircleProps = {
    fill:midgroundF,
    size:[200,200],
}    
const parent = createRef<Layout>();

export default makeScene2D(function* (view){
  
    view.add(
            <Layout layout gap={50} ref={parent}/>
    )   

    //adding circles + their references
    const circlerefs: Reference<Circle>[] = [];
    for(let i = 0; i<3; i++){
        circlerefs.push(createRef<Circle>()) //created reference
        let u = <Circle ref={circlerefs[i]} {...circleStyle} /> //created circle and assigned reference
        parent().add(u) //added circle to view
    }
    //we have 4 circles now

    // const times = [
    //     0.3, //starting
    //     0.1, 0.1, 
    //     0.3, 
    //     0.1, 0.1, 
    //     0.3,
    //     0.3,
    //     0.2, 0.1, 
    // ]
 
    // yield* waitFor(0.5)

    yield* waitFor(1)

    yield* chain(

            waitFor(0.5),
            circlerefs[0]().fill(foreground,0),
            waitFor(0.5),
            circlerefs[1]().fill(foreground,0),
            waitFor(0.5),
            circlerefs[2]().fill(foreground,0),

            waitFor(0.3),
            circlerefs[2]().fill(midgroundF,0),
            waitFor(0.1),
            circlerefs[1]().fill(midgroundF,0),
            waitFor(0.1),
            circlerefs[0]().fill(midgroundF,0),

            waitFor(0.3),
            circlerefs[0]().fill(foreground,0),
            waitFor(0.5),
            circlerefs[1]().fill(foreground,0),
            waitFor(0.5),
            circlerefs[2]().fill(foreground,0),

            waitFor(0.4),
            circlerefs[2]().fill(midgroundF,0),
            waitFor(0.5),
            circlerefs[1]().fill(midgroundF,0),
            waitFor(0.5),
            circlerefs[0]().fill(midgroundF,0),

            waitFor(0.4),
            circlerefs[0]().fill(foreground,0),
            circlerefs[1]().fill(foreground,0),
            circlerefs[2]().fill(foreground,0),



            waitFor(0.4),
            circlerefs[2]().fill(midgroundF,0),
            waitFor(0.1),
            circlerefs[1]().fill(midgroundF,0),
            waitFor(0.1),
            circlerefs[0]().fill(midgroundF,0),

            waitFor(0.3),
            circlerefs[0]().fill(foreground,0),
            waitFor(0.1),
            circlerefs[1]().fill(foreground,0),
            waitFor(0.5),
            circlerefs[2]().fill(foreground,0),

            waitFor(0.2),

            circlerefs[2]().fill(midgroundF,0),
            circlerefs[1]().fill(midgroundF,0),
            circlerefs[0]().fill(midgroundF,0),
            
            waitFor(0.3),

            waitFor(0.3),
            circlerefs[0]().fill(foreground,0),
            waitFor(0.3),
            circlerefs[1]().fill(foreground,0),
            waitFor(0.3),
            circlerefs[2]().fill(foreground,0),

            waitFor(0.3),

            view.fill(foreground,0),
            circlerefs[2]().opacity(0,0),
            circlerefs[1]().opacity(0,0),
            circlerefs[0]().opacity(0,0),
            waitFor(0.1),

            
        )

    yield* waitFor(0.2) // prevent jumpStop
})