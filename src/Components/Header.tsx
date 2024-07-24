import { useState } from 'react'
import '../Styles/Header.scss'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

  // const activeTabRef = useRef<HTMLDivElement>(null)
  // const ulRef = useRef<HTMLDivElement>(null)

  const [showMenu, setShowMenu] = useState<boolean>(false)

  const navArray: { pathName: string, name: string }[] = [{
    pathName: '/',
    name: 'Home'
  }, {
    pathName: '/explore',
    name: 'Explore'
  }, {
    pathName: '/about',
    name: 'About'
  }, {
    pathName: '/signup',
    name: 'SignUp'
  }, {
    pathName: '/login',
    name: 'Login'
  },]

  const location = useLocation().pathname

  // const ulHover = (e:any) => {
  //   // console.log(e.clientX)
  //   if(activeTabRef.current) {
  //     // console.log(ulTagRef.current.clientX)
  //     // activeTabRef.current.style.background = 'red'
  //     // activeTabRef.current.style.left = `50px`
  //     // console.log('aaasasa', ulRef.current.getBoundingClientRect())
  //     const bgBox = activeTabRef.current
  //     const mousePos = e.clientX



  //     const ulWidth = ulRef.current.getBoundingClientRect().width;
  //     const ulLeftPos = ulRef.current.getBoundingClientRect().left 
  //     console.log(ulLeftPos)

  //     if(mousePos > ulLeftPos+12.5) {
  //       bgBox.style.left = `${mousePos - ulRef.current.getBoundingClientRect().left}px`
  //     }



  //     // const ppp = 
  //     console.log(ulWidth, e.clientX - ulRef.current.getBoundingClientRect().left )


  //     // activeTabRef.current.style.left = `tranalsteX(${372 - e.clientX}%)`
  //   }

  // const navHover = (e:any) => {
  //   console.log(e.clientX)
  //   // console.log(e.getBoundingClientRect())
  // }

  return (
    <>
      <header>
        <h1>Snapp<span>!</span></h1>
        <ul>
          {
            navArray.map((item) => (
              <Link to={item.pathName} key={item.name} className={(item.pathName === location) ? 'selectedRoute' : ''} >{item.name}</Link>
            ))
          }
        </ul>
        <div className="menuBar">
          <div className={`circle ${showMenu ? 'view' : ''}`}></div>
          {
            !showMenu && (
              <svg onClick={() => setShowMenu(prev => !prev)} width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )
          }
          {
            showMenu && (
              <svg onClick={() => setShowMenu(prev => !prev)} className='showingMenu' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Menu / Menu_Alt_01">
                  <path id="Vector" d="M12 17H19M5 12H19M5 7H19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            )
          }
        </div>
      </header>
      <ul className="responsiveMenu" style={showMenu ? { height: '200px' } : { height: "0px" }}>
        {
          navArray.map((item) => (
            <Link to={item.pathName} key={item.name} className={(item.pathName === location) ? 'selectedRoute' : ''} >{item.name}</Link>
          ))
        }
      </ul>
    </>
  )
}

export default Header