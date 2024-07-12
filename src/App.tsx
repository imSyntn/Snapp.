import { Suspense, lazy, useState, useEffect } from 'react'
import './Styles/Loader.scss'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Loader from './Components/Loader'

// const Home = lazy(()=> import('./Components/Home'))
const Explore = lazy(() => import('./Components/Explore'))
const About = lazy(() => import('./Components/About'))


function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  return (
    <>
      {
        isLoading ? (
          <div className="Loader">
            <Loader />
          </div>
        ) : (
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/explore' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><Explore /></Suspense>} />
              <Route path='/about' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><About /></Suspense>} />
              <Route path='/about' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><About /></Suspense>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        )
      }
    </>
  )
}

export default App
