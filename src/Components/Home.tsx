import { } from 'react'
import HeroSection from './Home/HeroSection'
import ImageCarousel from './Home/ImageCarousel'
import MainSection from './Home/MainSection'
import Contact from './Home/Contact'

const Home = () => {
    return (
        <>
            <HeroSection />
            <div className="carousalWrapper">
                <ImageCarousel />
                <ImageCarousel />
            </div>
            <MainSection />
            <Contact />
        </>
    )
}

export default Home