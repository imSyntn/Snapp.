import { Suspense, lazy, useState, useEffect } from 'react'
import './Styles/Loader.scss'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Loader from './Components/Loader'
import { UserLoginProp } from './App.types'

// const Home = lazy(()=> import('./Components/Home'))
const Explore = lazy(() => import('./Components/Explore'))
const About = lazy(() => import('./Components/About'))
const FullScreenImage = lazy(()=> import('./Components/Explore/FullScreenImage'))
const NoRoutes = lazy(()=> import('./Components/NoRoutes'))
const Share = lazy(()=> import('./Components/Share'))
const FormTemplate = lazy(()=> import('./Components/User/FormTemplate'))
const User = lazy(()=> import('./Components/User/User'))

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userDetails, setUserDetails] = useState<UserLoginProp>({
    userName: 'imSyntn'
  })

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
            <Header userDetails={userDetails} />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/explore' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><Explore /></Suspense>} />
              <Route path='/about' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><About /></Suspense>} />
              <Route path='/about' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><About /></Suspense>} />
              <Route path='/login' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><FormTemplate /></Suspense>} />
              <Route path='/user/:userName' element={<Suspense fallback={<div className="Loader"></div>}><User /></Suspense>} />
              <Route path='/share/:id' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><Share /></Suspense>} />
              <Route path='/fullScreenImage/:id' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><FullScreenImage /></Suspense>} />
              <Route path='*' element={<Suspense><NoRoutes /></Suspense>} />
            </Routes>
            <Footer />
          </BrowserRouter>
        )
      }
    </>
  )
}

export default App
