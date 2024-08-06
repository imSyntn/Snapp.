import { Suspense, lazy, useState, useEffect, createContext } from 'react'
import './Styles/Loader.scss'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Loader from './Components/Loader'

import { ResultProp } from './App.types'
import Attribute from './Components/Explore/Attribute'
// import { blankType } from './App.types'
// import { UserLoginProp } from './App.types'

// const Home = lazy(()=> import('./Components/Home'))
const Explore = lazy(() => import('./Components/Explore'))
const About = lazy(() => import('./Components/About'))
const FullScreenImage = lazy(() => import('./Components/Explore/FullScreenImage'))
const NoRoutes = lazy(() => import('./Components/NoRoutes'))
const Share = lazy(() => import('./Components/Share'))
// const FormTemplate = lazy(()=> import('./Components/User/FormTemplate'))
// const User = lazy(()=> import('./Components/User/User'))


interface downloadInitiatedType {
  downloadInitiated: ResultProp | boolean,
  setDownloadInitiated: React.Dispatch<React.SetStateAction<ResultProp | boolean>>
}

export const downloadInitiatedContext = createContext<downloadInitiatedType | undefined>(undefined)

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [downloadInitiated, setDownloadInitiated] = useState<ResultProp | boolean>(false)

  // const [userDetails, setUserDetails] = useState<UserLoginProp>({
  //   userName: 'imSyntn'
  // })

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000)
  }, [])

  useEffect(() => {
    // console.log(downloadInitiated)
    // if (downloadInitiated) {
    //   setTimeout(() => {
    //     setDownloadInitiated(false)
    //   }, 2000)
    // }
  }, [downloadInitiated])

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
            <downloadInitiatedContext.Provider value={{ downloadInitiated, setDownloadInitiated }}>
              {
                downloadInitiated && (
                  <Attribute result={downloadInitiated} />
                )
              }
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><About /></Suspense>} />
                <Route path='/explore' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><Explore /></Suspense>} />
                <Route path='/share/:id' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><Share /></Suspense>} />

                <Route path='/fullScreenImage/:id' element={<Suspense fallback={<div className="Loader"><Loader /></div>}><FullScreenImage /></Suspense>} />
                <Route path='*' element={<Suspense><NoRoutes /></Suspense>} />
              </Routes>
            </downloadInitiatedContext.Provider>
            <Footer />
          </BrowserRouter>
        )
      }
    </>
  )
}

export default App
