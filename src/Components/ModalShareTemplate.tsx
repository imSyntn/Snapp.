import { memo, useState, useEffect } from 'react'
import '../Styles/ModalShareTemplate.scss'
import { ResultProp } from '../App.types'
import { useAbcType } from '../Utils/useAbcType';
import { useDateTime } from '../Utils/useDateTime';
import { useImageDownloader } from '../Utils/useImageDownloader';
// import { useWindowResize } from '../Utils/useWindowResize';

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaShare, FaInstagram } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaCcPaypal, FaXTwitter } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import { motion, AnimatePresence } from 'framer-motion'
import ImageComponent from './Explore/ImageComponent';


interface dropdownType {
    button: boolean,
    text: boolean
}

const ModalShareTemplate = ({ result }: { result: ResultProp }) => {

    const getImageDownloader = useImageDownloader()
    // const { size: { windowWidth } } = useWindowResize()

    const [showDropdown, setShowDropdown] = useState<dropdownType>({
        button: false,
        text: false
    })
    const [copied, setCopied] = useState<boolean>(false)
    const [downloadInitiated, setDownloadInitiated] = useState<boolean>(false)

    const AbcType = useAbcType(result.alt_description)
    const dateInReadableFormat = useDateTime(result.created_at)

    const handleShareLink = () => {
        const shareableUrl = `${window.location.origin}/share/${result.id}`
        console.log(shareableUrl)
        navigator.clipboard.writeText(shareableUrl)
        setCopied(true)
    }

    useEffect(() => {
        setCopied(false)
        setDownloadInitiated(false)
    }, [])

    const dropdownVariants = {
        hidden: { scaleY: 0 },
        visible: {
            scaleY: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };


    return (
        <>
            <AnimatePresence>
                {
                    downloadInitiated && (
                        <motion.div className="attributionDiv"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}>
                            <RxCross2 onClick={() => setDownloadInitiated(false)} />
                            <img src={result.user.profile_image.medium} alt="" />
                            <div className="attribution">
                                <h3>SayThanks<em>!</em></h3>
                                <p>Give a shoutout to <span>{result.user.name}</span></p>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
            <div className="userDetails-downloadLink">
                <div className="userDetails">
                    <img src={result.user.profile_image.medium} alt="Profile Image" />
                    <div className="nameID">
                        <p>{result.user.name}</p>
                        <div className="id">
                            {result.user.social.instagram_username && <a target='_blank' href={`https://www.instagram.com/${result.user.social.instagram_username}`}><FaInstagram /></a>}
                            {result.user.social.twitter_username && <a target='_blank' href={`https://x.com/${result.user.social.twitter_username}`}><FaXTwitter /></a>}
                            {result.user.social.portfolio_url && <a target='_blank' href={result.user.social.portfolio_url}><TbWorldWww /></a>}
                            {result.user.social.paypal_email && <a target='_blank' href={result.user.social.paypal_email}><FaCcPaypal /></a>}
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <button onClick={() => setShowDropdown(prev => ({ ...prev, button: !prev.button }))}>Download {showDropdown.button ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                    {
                        showDropdown.button && (
                            <motion.div className='dropdownContentDiv' variants={dropdownVariants} initial={'hidden'} animate={'visible'}>
                                {
                                    Object.entries(result.urls).map(([name, link]) => (
                                        <motion.p key={name} variants={itemVariants} onClick={() => {
                                            getImageDownloader(link, `${result.alt_description}.jpg`);
                                            setDownloadInitiated(true)
                                        }}>{name} <FiDownload /></motion.p>
                                    ))
                                }
                            </motion.div>
                        )
                    }
                </div>
            </div>

            {/* <ImageComponent item={result} clickEvent={()=> {}} showUserDetails={false} /> */}

            <img onClick={() => window.open(`${window.location.origin}/fullScreenImage/${result.id}`, '_blank')} src={result.urls.regular} className='ModalImage' alt={result.alt_description}
                style={
                    // (result.height > result.width) ? 
                    { height: `calc(100vh - 50px - 20px - 140px)`, aspectRatio: `${result.width}/${result.height}` }
                    // : (windowWidth>900)? { width: 'calc(100vw - 220px)',aspectRatio: `${result.width}/${result.height}`} : { width: 'calc(100vw - 10vw - 20px)',aspectRatio: `${result.width}/${result.height}`}
                }
            />

            <div className="imageDetails">
                <p className="description">{AbcType}</p>
                <div className="variableData">
                    <div className="views variableDataContent">
                        <h3>Views</h3>
                        <p>{result.views ?? 'Not available'}</p>
                    </div>
                    <div className="downloads variableDataContent">
                        <h3>Downloads</h3>
                        <p>{result.downloads ?? 'Not available'}</p>
                    </div>
                    <button onClick={handleShareLink} style={copied ? { backgroundColor: '#80ff80' } : {}}>{copied ? <><SiTicktick />Copied</> : <><FaShare />Share</>}</button>
                </div>
                <div className="constantData">
                    {/* <div className="details"> */}
                    <p><MdOutlineDateRange />Published at {dateInReadableFormat}</p>
                    {
                        result.location?.name &&
                        <p>< CiLocationOn />{result.location.name ?? ''}</p>
                    }
                    {
                        (typeof result.location === 'string') && <p>< CiLocationOn />{result.location}</p>
                    }
                    {
                        result.exif?.name && <div className='dropdown'>
                            {
                                showDropdown.text &&
                                <motion.div className="dropdownContentDiv" variants={dropdownVariants} initial={'hidden'} animate={'visible'}>
                                    {
                                        Object.entries(result.exif).map(([name, value]) => (
                                            <>
                                                {
                                                    value && (
                                                        <>
                                                            <motion.h3 variants={itemVariants}>{name}</motion.h3>
                                                            <motion.p variants={itemVariants}>{value ?? ''}</motion.p>
                                                        </>
                                                    )
                                                }
                                            </>
                                        ))
                                    }
                                </motion.div>
                            }
                            <p onClick={() => setShowDropdown(prev => ({ ...prev, text: !prev.text }))}>< FiCamera />{result.exif.name}{showDropdown.text ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                        </div>
                    }
                    <p><IoShieldCheckmarkOutline />Free to use under<a target='_blank' href="https://unsplash.com/license">Unsplash Lisence</a></p>
                    {/* </div> */}
                </div>
            </div>
        </>
    )
}

export default memo(ModalShareTemplate)