import {} from 'react'
import { Link } from 'react-router-dom'
import '../../Styles/Home/HeroSection.scss'

const HeroSection = () => {
  return (
    <section className='heroSection'>
        <h1>Discover Stunning Images</h1>
        <p>Explore a vast collection of high-quality images from around the world. Find the perfect visuals for your projects.</p>
        <nav>
            <Link to={'/explore'}><button>Get Started</button></Link>
            <Link to={'/about'}><button>Learn More</button></Link>
        </nav>
    </section>
  )
}

export default HeroSection