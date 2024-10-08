import { useState } from 'react'
import '../Styles/Header.scss'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
// import { UserLoginProp } from '../App.types'

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
  }]

  // const userNav = {
  //   pathName: '/login',
  //   name: 'Login'
  // }

  const location = useLocation().pathname

  const variants = {
    show : {
      scale: 1,
      opacity : 1,
      x: '-35%',
      y: '-50%'
    },
    hide: {
      scale: 0,
      x: '-50%',
      y: '-50%'
    }
  }

  return (
    <>
      <header>
        <h1 id='no-selection'>Snapp<span>!</span></h1>
        <ul>
          {
            navArray.map((item) => (
              <Link to={item.pathName} id='no-selection' key={item.name} className={(item.pathName === location) ? 'selectedRoute' : ''} >{item.name}</Link>
            ))
          }
          {
            // (userDetails.userName == '') ? (
            //   <Link to={userNav.pathName} className={(userNav.pathName === location) ? 'selectedRoute' : ''} >{userNav.name}</Link>
            // ) : (
            //   <Link to={`user/${userDetails.userName}`} className='userName'>{userDetails.userName}</Link>
            // )
          }
        </ul>
        <div className="menuBar" onClick={() => setShowMenu(prev => !prev)}>
          <motion.div 
          animate={showMenu ? 'show' : 'hide'}
          // animate='show'
           variants={variants} className='circle'
          />
          {
            !showMenu && (
              <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6H20M4 12H14M4 18H9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )
          }
          {
            showMenu && (
              <svg className='showingMenu' width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Menu / Menu_Alt_01">
                  <path id="Vector" d="M12 17H19M5 12H19M5 7H19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            )
          }
        </div>
      </header>
      <ul className="responsiveMenu" style={showMenu ? { height: '150px', transition: 'height 0.5s' } : { height: "0px" }}>
        {
          navArray.map((item) => (
            <Link to={item.pathName} id='no-selection' key={item.name} className={(item.pathName === location) ? 'selectedRoute' : ''} >{item.name}</Link>
          ))
        }
      </ul>
    </>
  )
}

export default Header