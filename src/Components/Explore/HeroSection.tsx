import { useCallback, useEffect, useRef, useState } from 'react'
import '../../Styles/Explore/HeroSection.scss'
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HeroSection = () => {

    interface LeftRight {
        left: boolean,
        right: boolean
    }

    const [showLeftRight, setShowLeftRight] = useState<LeftRight>({
        left: false,
        right: true,
    })
    const topicsDivRef = useRef<HTMLDivElement>(null)

    const scrollAnimation = (params: string) => {
        topicsDivRef.current && (topicsDivRef.current.scrollLeft += (params == '+' ? 100 : -100))
        console.log(topicsDivRef.current?.scrollLeft)
    }

    const LeftRightArrow = () => {

        // new Promise((resolve,reject)=> {
        //     setTimeout(() => {
        //         if (topicsDivRef.current?.scrollLeft == 0) resolve({
        //             left: false,
        //             right: true
        //         });
        //         if (topicsDivRef.current?.scrollLeft == topicsDivRef.current?.scrollWidth) resolve({
        //             right: false,
        //             left: true
        //         });
        //     }, 350)
        // }).then((data:any) => setShowLeftRight(data))

        // setTimeout(() => {
        //     if (topicsDivRef.current?.scrollLeft == 0) setShowLeftRight({
        //         left: false,
        //         right: true
        //     })
        //     if (topicsDivRef.current?.scrollLeft == topicsDivRef.current?.scrollWidth) setShowLeftRight({
        //         right: false,
        //         left: true
        //     })
        // }, 350)
    }


    return (
        <div className='HeroSection'>
            <div className="catagories">
                <div className="slider"
                    // style={(topicsDivRef.current?.scrollLeft == 0) ? { display: 'none' } : {}} 
                    onClick={() => { scrollAnimation('-'); LeftRightArrow() }}><FaChevronLeft /></div>
                <div className="topicsDiv" ref={topicsDivRef}>
                    {
                        new Array(15).fill(1).map((item, index) => (
                            <p key={item * index}>Wallpapers</p>
                        ))
                    }
                </div>
                <div className="slider" onClick={() => { scrollAnimation('+'); LeftRightArrow() }}><FaChevronRight /></div>
            </div>
            <div className="search-Text">
                <div className="text">
                    <h1>Random</h1>
                    <p>Capture the magic of "Golden Hour" with breathtaking images taken during sunset bathed in warm, golden light.</p>
                </div>
                <div className="searchDiv">
                    <IoSearchSharp />
                    <input type="text" name="" id="" placeholder='Search here...' />
                </div>
            </div>
        </div>
    )
}

export default HeroSection