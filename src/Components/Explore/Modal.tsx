import { memo } from 'react'
import '../../Styles/Explore/Modal.scss'
import { ResultProp } from '../../App.types'
import { RxCross2 } from "react-icons/rx";
import ModalShareTemplate from '../ModalShareTemplate';
import { motion, AnimatePresence } from 'framer-motion'


const Modal = ({ result, setModalIndex }: { result: ResultProp, setModalIndex: Function }) => {

    console.log(result)

    return (
        <motion.div className='Modal' data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="hideModal" onClick={() => setModalIndex(-1)}>
                <RxCross2 />
            </div>
            <ModalShareTemplate result={result} />
        </motion.div>
    )
}

export default memo(Modal)