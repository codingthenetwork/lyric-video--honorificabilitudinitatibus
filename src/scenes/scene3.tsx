import { Layout, makeScene2D, Txt, CircleProps, Circle, TxtProps, is, Rect, LayoutProps } from '@motion-canvas/2d'
import {createRef, Reference, waitFor, all, chain} from '@motion-canvas/core'

//colors
const foreground = '#fcfcfcff';
const midgroundF = '#808080ff';
const midgroundB = '#272727ff';
const background = '#000000ff';
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
            'I'
        ],
        [
            "ain't"
        ],
        [
           'prag', 'mat', 'ic'
        ],
        [
            "I'm"
        ],
        [
            'dra','mat','ic,'
        ],
        [
            'a'
        ],
        [
            'born'
        ],
        [
            'po','et'
        ],
    ],
    [
        [
            'You'
        ],
        [
            'laugh'
        ],
        [
            'at'
        ],
        [
            'it'
        ],
        [
            'I'
        ],
        [
            'crave'
        ],
        [
            'hav','oc'
        ],
        [
            'in'
        ],
        [
            'dull'
        ],
        [
            'mo','ments'
        ],
    ],
    [
        [
            'The'
        ],
        [
            'mad'
        ],
        [
            'hat','ter'
        ],
        [
            'with','out'
        ],
        [
            'a'
        ],
        [
            'hat'
        ],
        [
            'hav','ing'
        ],
        [
            'his'
        ],
        [
            'skull'
        ],
        [
            'o','pened'
        ]
    ],
    [
        [
            'At'
        ],
        [
            "a"
        ],
        [
            'gath','er','ing'
        ],
        [
            'with'
        ],
        [
            'a'
        ],
        [
            'mad'
        ],
        [
            'rab','bit'
        ],
        [
            'to'
        ],
        [
            'mull'
        ],
        [
            'over'
        ],
    ]
]
const myLyrics2 = [
    [
        [
            'Why'
        ],
        [
            'I'
        ],
        [
            "ain't"
        ],
        [
            'got'
        ],
        [
            'no'
        ],
        [
            'sym','pa','thy?'
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
const creditContainer = createRef<any>();

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
                let c = <Txt text={lyrics[i][j][k]} fill={color} fontSize={40}/> //syllable
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

        0.2, 0.1, 0.3, 0.1, 0.1, 0.1, 0.2, 0.1, 0.1, 0.2, 0.1, 0.2, 0.1, //I ain't prag-ma-tic, I'm dra-mat-ic, a born po-et (13)
        0.2, 0.2, 0.1, 0.1, 0.2, 0.1, 0.2, 0.1, 0.1, 0.1, 0.2, 0.1,   //You laugh at it I crave ha-voc in dull mo-ments (12)
        0.3, 0.1, 0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.3, 0.1, 0.2, 0.1, 0.3, 0.1, 0.1, 0.07,  //The mad ha-tter with-out a hat hav-ing his skull o-pened (14)
        0.2, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.4, 0.1, 0.1, 0.1, 0.3, 0.1,   //At a ga-ther-ing with a mad ra-bbit to mull o-ver (14)
        
    ]

    times2 = [
       0.3, 0.1, 0.1, 0.1, 0.1, 0.1, 0.2, 0.2, //Why I ain't got no sym-pa-thy (8)
       1
       
    ]

    // for(let i =0;i<50;i++){
    //     times1.push(0.1)
    // }
    // for(let i =0;i<50;i++){
    //     times2.push(0.1)
    // }

    function* showLyrics2(parent: Reference<any>, timeData: number[], color: any){
        let u = parent().findAll(is(Txt))
        for(let i = 0; i< Math.min(timeData.length,u.length); i++){
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
            >
                <Layout
                    layout
                    gap={80}
                    ref={labelContainer}
                >
                    <Txt {...labelStyle}>ALLTA</Txt>
                    <Txt {...labelStyle}>Honorificabilitudinitatibus</Txt>
                </Layout>
                <Txt {...labelStyle} ref={creditContainer}>@extrasauce</Txt>
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

            <Layout justifyContent={'center'} gap={30} ref={circleContainer}>
               <Circle {...decCircleStyle}/> 
               <Circle {...decCircleStyle}/> 
               <Circle {...decCircleStyle}/> 
            </Layout>

        </Rect>
    )

    yield* all(
        chain(
            addLyrics(lyricSection1, myLyrics1, midgroundB),
            addLyrics(lyricSection2, myLyrics2, background),
            font(),   //place after all instances of addLyrics()

            showLyrics2(lyricSection1, times1, foreground),
            showLyrics2(lyricSection2, times2, midgroundF),

            waitFor(1),

            all(
                labelContainer().opacity(0,0.5),
                circleContainer().opacity(0,0.5),
                lyricSection1().opacity(0,0.5),
                lyricSection2().opacity(0,0.5),
                creditContainer().fill(foreground,0.5),
                
            ),

            waitFor(2)

        ),
    )
    

})