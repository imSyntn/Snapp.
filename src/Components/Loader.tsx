import { } from 'react'
import '../Styles/Loader.scss'
// import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
// import '@dotlottie/react-player/dist/index.css';
// import lottie from ''
// import CustomImg from '../assets/Animation - 1720453391314.gif'
// import Customvid from '../assets/Animation - 1720453391314.webm'

// import Lottie from 'react-lottie';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../assets/Animation - 1720453391314.json';

const Loader = () => {

    return (
        // <div className='Loader'>
             <Player src={animationData} autoplay loop style={{ height: '300px', width: '300px' }} />
        // </div>
    )
}

export default Loader