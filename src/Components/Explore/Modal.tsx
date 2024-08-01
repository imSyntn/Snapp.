import { memo } from 'react'
import '../../Styles/Explore/Modal.scss'
import { ResultProp } from '../../App.types'
import { RxCross2 } from "react-icons/rx";
import ModalShareTemplate from '../ModalShareTemplate';
// import { motion } from 'framer-motion'
// import SmoothScroll from '../../Utils/SmoothScroll';


const Modal = ({ result, setModalIndex }: { result: ResultProp, setModalIndex: Function }) => {

    console.log(result)

    return (
        // <SmoothScroll>
            <div className='Modal' data-lenis-prevent>
                <div className="hideModal" onClick={() => setModalIndex(-1)}>
                    <RxCross2 />
                </div>
                <ModalShareTemplate result={result} />
            </div>
        // </SmoothScroll>
    )
}

export default memo(Modal)