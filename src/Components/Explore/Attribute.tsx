import React, { useContext, memo } from 'react'
import '../../Styles/Explore/Attribute.scss'
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from 'framer-motion'
import { downloadInitiatedContext } from '../../App';
import { FaRegCopy } from "react-icons/fa6";
// import { ResultProp } from '../../App.types';

const Attribute = ({ result }: { result: any }) => {

    console.log(result)

    const attributeContext = useContext(downloadInitiatedContext)
    if(!attributeContext) {
        return null
    }

    const { setDownloadInitiated } = attributeContext;

    return (
        <AnimatePresence>
            <motion.div className="attributionDiv"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <div className="attribute">
                    <RxCross2 onClick={() => setDownloadInitiated(false)} />
                    <img src={result.user.profile_image.medium} alt="" />
                    <div className="attribution">
                        <h3>SayThanks<em>!</em></h3>
                        <p>Give a shoutout to <span>{result.user.name}</span></p>
                        <div className="copy">
                            <p>Photo by <a href={result.user.links.html} target='_blank'>{result.user.name}</a></p>
                            <FaRegCopy onClick={()=> {
                                navigator.clipboard.writeText(`Photo by <a href=${result.user.links.html} target='_blank'>${result.user.name}</a>`)
                            }} />
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}

export default memo(Attribute)