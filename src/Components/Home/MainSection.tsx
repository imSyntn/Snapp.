import { useState, useEffect, useRef } from 'react'
import '../../Styles/Home/MainSection.scss'
import { NameDescObj } from '../../App.types'
import FeatureImgText from './FeatureImgText'


const nameDescArr: NameDescObj[] = [
    {
        name: 'Image Discovery',
        desc: 'Explore a vast collection of high-quality images',
        img: 'https://i.ibb.co/Fh2nmgn/Load-more-cuate.png'
    },
    {
        name: 'Easy Sharing',
        desc: 'Share images with others easily',
        img: 'https://i.ibb.co/12wz6Ct/Connected-cuate.png"'
    }

    // {
    //     name: 'Save and organize',
    //     desc: 'Save your favorite images to collections',
    //     img: 'https://images.unsplash.com/photo-1719607055881-fe8c6aa6a199?crop=entropy&cs=srgb&fm=jpg&ixid=M3w2MzAzNTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjAzNjM1Mzl8&ixlib=rb-4.0.3&q=85'
    // }
]

const MainSection = () => {

    return (
        <main>
            <div className="featureBasedImageSection">
                {
                    nameDescArr.map((item,index)=> (
                        <FeatureImgText key={item.name} img={item.img} name={item.name} desc={item.desc} />
                    ))
                }
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