import { Suspense, lazy, useState } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'

// const Home = lazy(()=> import('./Components/Home'))
const Explore = lazy(()=> import('./Components/Explore/Explore'))
const About = lazy(()=> import('./Components/About'))


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Suspense><Explore /></Suspense>} />
          <Route path='/about' element={<Suspense><About /></Suspense>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
