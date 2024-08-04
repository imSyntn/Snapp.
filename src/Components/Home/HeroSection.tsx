import {} from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Home/HeroSection.scss'

const HeroSection = () => {
  return (
    <section className='heroSection'>
        <h1 id='no-selection'>Discover Stunning Images.</h1>
        <p id='no-selection'>Explore a vast collection of high-quality images from around the world. Find the perfect visuals for your projects.</p>
        <nav>
            <Link to={'/explore'}><button id='no-selection'>Get Started</button></Link>
            <Link to={'/about'}><button id='no-selection'>Learn More</button></Link>
        </nav>
    </section>
  )
}

export default HeroSection