import { useState } from 'react'
import Header from './Components/Header'
import HeroSection from './Components/HeroSection'
import ImageCarousel from './Components/ImageCarousel'
import Footer from './Components/Footer'
import MainSection from './Components/MainSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <HeroSection />
      <div className="carousalWrapper">
        <ImageCarousel />
        <ImageCarousel />
      </div>
      <MainSection />

      <Footer />
    </>
  )
}

export default App
