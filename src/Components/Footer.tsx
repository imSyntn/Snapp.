import {} from 'react'
import '../Styles/Footer.scss'
import { SiGithub } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <h1>Snapp<span>!</span></h1>
      <div className="icons">
        <div className="links">
          <a href="https://github.com/imSyntn/Snap." target='_blank'><SiGithub className='white' /></a>
          <a href="https://twitter.com/imSyntn" target='_blank'><FaXTwitter className='white' /></a>
          <a href="https://github.com/sponsors/imSyntn" target='_blank'><FaRegHeart className='heart' /></a>
        </div>
        <p>Website by <a target='_blank' href="https://twitter.com/imSyntn">@imSyntn</a></p>
      </div>
    </footer>
  )
}

export default Footer