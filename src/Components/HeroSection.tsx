import {} from 'react'
import '../Styles/HeroSection.scss'

const HeroSection = () => {
  return (
    <section className='heroSection'>
        <h1>Discover Stunning Images</h1>
        <p>Explore a vast collection of high-quality images from around the world. Find the perfect visuals for your projects.</p>
        <nav>
            <button>Get Started</button>
            <button>Learn More</button>
        </nav>
    </section>
  )
}

export default HeroSection