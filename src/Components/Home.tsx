import { } from 'react'
import HeroSection from './Home/HeroSection'
import ImageCarousel from './Home/ImageCarousel'
import MainSection from './Home/MainSection'
import Contact from './Home/Contact'

const Home = () => {

    // const [totalImgLoded, setTotalImgLoded] = useState<number>(0)
    // const imgCount:number = 20;

    // useEffect(()=>{
    //     if(imgCount === totalImgLoded) {
    //         setIsLoading(false)
    //     }
    // },[])

    // const handle

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