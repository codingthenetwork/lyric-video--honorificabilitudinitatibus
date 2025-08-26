import { Layout, makeScene2D, Txt, CircleProps, Circle, TxtProps, is, Rect, LayoutProps } from '@motion-canvas/2d'
import {createRef, Reference, waitFor, all, chain} from '@motion-canvas/core'

//colors
const background = '#fcfcfcff';
const midgroundB = '#c2c2c2ff';
const midgroundF = '#494949ff';
const foreground = '#000000ff';
const indicatorLight = '#eb7a7aff'
const indicatorDark = '#492323ff'
const tempTime = 0.1;
let timesTracker: number = 0;

//times
let times1: number[] = [];
let times2: number[] = [];

//lyrics
class L{
    content: string;
    duration: number

    constructor(content: string, duration: number){
        this.content = content;
        this.duration = duration;
    }
}

//lyrics(Array) > lines(Layout) > words(Layout) > syllables(Txt)
const myLyrics1 = [
    [
        [
            new L('I', tempTime)
        ],
        [
            new L("ain't", tempTime)
        ],
        [
            new L('at', tempTime)
        ],
        [
            new L('all', tempTime)
        ],
        [
            new L('in', tempTime)
        ],
        [
            new L('it', tempTime)
        ],
        [
            new L("I'm", tempTime)
        ],
        [
            new L('bored', tempTime)
        ],
        [
            new L('with', tempTime)
        ],
        [
            new L('it', tempTime)
        ],
    ],
    [
        [
            new L('This', tempTime),
        ],
        [
            new L('whole', tempTime),
        ],
        [
            new L('im', tempTime),
            new L('age', tempTime),
        ],
        [
            new L('is', tempTime),
        ],
        [
            new L('aug', tempTime),
            new L('men', tempTime),
            new L('ted.', tempTime),
        ],
        [
            new L('It', tempTime),
        ],
        [
            new L("ain't", tempTime),
        ],
        [
            new L('au', tempTime),
            new L('then', tempTime),
            new L('tic', tempTime),
        ],
    ],
    [
        [
            new L('What', tempTime)
        ],
        [
            new L("y'all", tempTime)
        ],
        [
            new L('fig', tempTime),
            new L('ured?', tempTime)
        ],
        [
            new L("I'm", tempTime)
        ],
        [
            new L('all', tempTime)
        ],
        [
            new L('timid?', tempTime)
        ],
    ],
    [
        [
            new L('I', tempTime),
        ],
        [
            new L('been', tempTime),
        ],
        [
            new L('tor', tempTime),
            new L('men', tempTime),
            new L('ted', tempTime),
        ],
        [
            new L('my', tempTime),
        ],
        [
            new L('whole', tempTime),
        ],
        [
            new L('life', tempTime),
        ],
        [
            new L('to', tempTime),
        ],
        [
            new L('for', tempTime),
            new L('feit', tempTime),
        ],
        [
            new L('it', tempTime),
        ],
    ]
]
const myLyrics2 = [
    [
        [
            new L('(Fall', tempTime),
        ],
        [
            new L('in', tempTime),
        ],
        [
            new L('it)', tempTime),
        ],
    ]
]
const myLyricsAll = [myLyrics1, myLyrics2]  //recommend not using

//nodeStyles
const decCircleStyle: CircleProps = {
    size:[30,30],
    fill:midgroundB,
}
const labelStyle: TxtProps = {
    fontSize:30,
    fill:midgroundF,
}
const layoutGap = 10
const lyricSectionStyle: LayoutProps = {
    layout:true,
    direction:'column',  
    justifyContent:'center',  
    gap:layoutGap, 
}
const lyricSection = createRef<Layout>();
const lyricSection1 = createRef<Layout>();
const lyricSection2 = createRef<Layout>();
const rootSection = createRef<Rect>();
const labelContainer = createRef<Layout>();
const circleContainer = createRef<Layout>();

//styleFunctions
const font = function* () {
    let u = rootSection().findAll(is(Txt))
    for(let i=0; i< u.length; i++){
        u[i].fontFamily('Roboto Mono')
    }
}

//addFunctions
const addLyrics = function* (parent: Reference<any>, lyrics: any[], color: any) {

    
    // HERE 2

    for(let i=0; i<lyrics.length; i++){
        let a = <Layout gap={30}></Layout> //line
        for(let j = 0; j<lyrics[i].length; j++){
            let b = <Layout></Layout> //word
            for(let k = 0; k<lyrics[i][j].length; k++){
                let c = <Txt text={lyrics[i][j][k].content} fill={color} fontSize={40}/> //syllable
                b.add(c)
                //times.push(0.1)  //remove when manually setting time

            }
            a.add(b)
        }
        parent().add(a)
    }
}



export default makeScene2D(function* (view){

    // for(let i = 0; i<43; i++){
    // times.push(0.1)
    // }

    times1 = [

    //time at N plays, THEN word at N shows, THEN N+1 times... 
    //this also means word at N-1 shows for time at N seconds
    //to change how long word at N is displayed, change time at N+1

        // 1.1,  //Yeah
        0, 0.1, 0.1, 0.1, 0.2, 0.1, //I ain't at all in it (6)
        0.3, 0.1, 0.2, 0.1, //I'm bored with it (4)
        0.3, 0.1, 0.2, 0.1, 0.1, 0.1, 0.2, 0.1, //This whole im-age is aug-ment-ted (8)
        0.3, 0.1, 0.1, 0.2, 0.1, //It ain't au-then-tic (5)
        0.2, 0.1, 0.2, 0.07, 0.2, 0.1, 0.2, 0.1, // What y'all fi-gured? I'm all ti-mid (8)
        0.1, 0.1, 0.3, 0.1, 0.1, 0.1, 0.1, 0.3, 0.3, 0.3, 0.1,   // I been tor-men-ted my whole life to for-feit it (12)
        
    ]

    times2 = [
       0.3, 0.1, 0.1,  //fall in it
       
    ]

    

    function* showLyrics2(parent: Reference<any>, timeData: number[], color: any){
        let u = parent().findAll(is(Txt))
        for(let i = 0; i< u.length; i++){
            // yield* waitFor(timeData[timesTracker])
            // timesTracker++
            yield* waitFor(timeData[i])
            yield* u[i].fill(color,0)
        }
    }

    view.add(
        <Rect layout 
            ref={rootSection} 
            width={()=>'100%'} 
            height={()=>'100%'} 
            fill={background} 
            stroke={foreground} 
            lineWidth={10} 
            paddingLeft={150} 
            paddingRight={150} 
            paddingTop={70} 
            paddingBottom={70} 
            direction={'column'} 
            justifyContent={'space-between'}
        >

            <Layout
            layout
            justifyContent={'space-between'}
            ref={labelContainer}
            opacity={0}
            >
                <Layout
                    layout
                    gap={80}
                >
                    <Txt {...labelStyle}>ALLTA</Txt>
                    <Txt {...labelStyle}>Honorificabilitudinitatibus</Txt>
                </Layout>
                <Txt {...labelStyle}>@extrasauce</Txt>
            </Layout>

            <Layout 
            // ref={lyricSection}
            layout
            direction={'column'}
            justifyContent={'center'}
            // alignContent={'start'}
            // justifyContent={'center'}
            gap={layoutGap}
            >
                <Layout
                ref={lyricSection1}
                {...lyricSectionStyle}
                >
                    {/* <Txt fill={foreground} fontSize={40}>hello</Txt> */}

                </Layout>
                <Layout
                ref={lyricSection2}
                {...lyricSectionStyle}
                >

                    {/* <Txt fill={foreground} fontSize={40}>hello</Txt> */}

                </Layout>

            </Layout>

            <Layout justifyContent={'center'} gap={30} ref={circleContainer} opacity={0}>
               <Circle {...decCircleStyle}/> 
               <Circle {...decCircleStyle}/> 
               <Circle {...decCircleStyle}/> 
            </Layout>

        </Rect>
    )

    yield* addLyrics(lyricSection1, myLyrics1, midgroundB)
    yield* addLyrics(lyricSection2, myLyrics2, background)
    yield* font();   //place after all instances of addLyrics()

    // yield* waitFor(1)
    // yield* showLyrics(lyricSection, myLyricsAll)
    // yield* waitFor(1)

    yield* all(
        chain(
            showLyrics2(lyricSection1, times1, foreground),
            showLyrics2(lyricSection2, times2, midgroundF),
            waitFor(0.1)
        ),

        chain(
            waitFor(1),
            all(
                labelContainer().opacity(1,1),
                circleContainer().opacity(1,1),
            )
        )
    )

})