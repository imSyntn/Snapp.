import { memo } from 'react'
import '../../Styles/Explore/Modal.scss'
import { ResultProp } from '../../App.types'
import { RxCross2 } from "react-icons/rx";
import ModalShareTemplate from '../ModalShareTemplate';


const Modal = ({ result, setModalIndex }: { result: ResultProp, setModalIndex: Function }) => {
    console.log(result)

    return (
            <div className='Modal' data-lenis-prevent>
                <div className="hideModal" onClick={() => setModalIndex(-1)}>
                    <RxCross2 />
                </div>
                <ModalShareTemplate result={result} />
            </div>
    )
}

export default memo(Modal)