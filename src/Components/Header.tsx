import { useRef, useEffect } from 'react'
import '../Styles/Header.scss'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {

  // const activeTabRef = useRef<HTMLDivElement>(null)
  // const ulRef = useRef<HTMLDivElement>(null)

  const navArray = [{
    pathName: '/',
    name: 'Home'
  },{
    pathName: '/explore',
    name: 'Explore'
  },{
    pathName: '/about',
    name: 'About'
  },{
    pathName: '/signup',
    name: 'SignUp'
  },{
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

  useEffect(()=>{

  },[])
  
  return (
    <header>
      <h1>Snapp<span>!</span></h1>
      <ul 
      // onMouseMove={ulHover}
      //  ref={ulRef}
       >
        {/* <div ref={activeTabRef} className="activeTab"></div>
        <Link 
        // onMouseEnter={navHover}
         to={'/'}><li>Home</li></Link>
        <Link 
        // onMouseEnter={navHover}
         to={'/explore'}><li>Explore</li></Link>
        <Link 
        // onMouseEnter={navHover}
         to={'/about'}><li>About</li></Link>
        <Link 
        // onMouseEnter={navHover}
         to={'/signup'}><li>SignUp</li></Link>
        <Link 
        // onMouseEnter={navHover}
         to={'/login'}><li>Login</li></Link>
          */}
          {
            navArray.map((item,index)=> (
              <Link to={item.pathName} key={item.name}><li style={(item.pathName === location)? {color: 'gray'} : {}}>{item.name}</li></Link>
            ))
          }
      </ul>
    </header>
  )
}

export default Header