import { useState, useEffect, useRef } from 'react'
import '../Styles/MainSection.scss'
import { NameDescObj } from '../App.types'

const MainSection = () => {

    const [scrollTo, setScrollTo] = useState<number>(1)

    const imgDivRef = useRef<HTMLDivElement>(null)

    const nameDescArr: NameDescObj[] = [
        {
            name: 'Image Discovery',
            desc: 'Explore a vast collection of high-quality images',
            img: 'https://images.unsplash.com/photo-1718563552859-37ec6e6e918a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MzAzNTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjAzNjM1Mzl8&ixlib=rb-4.0.3&q=85'
        },
        {
            name: 'Easy Sharing',
            desc: 'Share images with others easily',
            img: 'https://images.unsplash.com/photo-1718480419942-a21efc9b5409?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MzAzNTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjAzNjM1Mzl8&ixlib=rb-4.0.3&q=85'
        },
        {
            name: 'Save and organize',
            desc: 'Save your favorite images to collections',
            img: 'https://images.unsplash.com/photo-1719607055881-fe8c6aa6a199?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MzAzNTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjAzNjM1Mzl8&ixlib=rb-4.0.3&q=85'
        }
    ]

    useEffect(() => {

        if (imgDivRef.current) {
            if (scrollTo == 1) {
                imgDivRef.current.style.top = '0%';
                imgDivRef.current.style.transform = 'translateY(0%)'
            } else if (scrollTo == 2) {
                imgDivRef.current.style.top = '50%';
                imgDivRef.current.style.transform = 'translateY(-50%)'
            } else {
                imgDivRef.current.style.top = '100%';
                imgDivRef.current.style.transform = 'translateY(-100%)'
            }

        }

    }, [scrollTo])

    return (
        <main>
            <div className="featureBasedImageSection">
                <div className='imgDivWrapper'>
                    <div className="imgDiv" ref={imgDivRef}>
                        {
                            nameDescArr.map((item, index) => (
                                <img src={item.img} key={item.name+index} alt="" />
                            ))
                        }
                    </div>
                </div>
                <div className="textDiv">
                    {
                        nameDescArr.map((item, index) => (
                            <div className="imgChangingButton" style={(scrollTo == index+1) ? {borderLeft: '2px solid white'} : {}} key={item.name} onClick={() => setScrollTo(index + 1)}>
                                <h1>{item.name}</h1>
                                <p>{item.desc}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="bannerWrapper">
                <div className="banner"></div>
                <div className="banner"></div>
                <div className="banner">
                    <h1>Discover Beautiful Images</h1>
                    <p>Easy Sharing, Save and Organize</p>
                </div>
            </div>

        </main>
    )
}

export default MainSection