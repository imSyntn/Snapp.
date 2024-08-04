import React, { memo, useState, useEffect, useContext } from 'react'
import '../Styles/ModalShareTemplate.scss'
import { ResultProp } from '../App.types'
import { useAbcType } from '../Utils/useAbcType';
import { useDateTime } from '../Utils/useDateTime';
import { useImageDownloader } from '../Utils/useImageDownloader';
// import { useWindowResize } from '../Utils/useWindowResize';

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
import { FaShare, FaInstagram } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaCcPaypal, FaXTwitter } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
import { SiTicktick } from "react-icons/si";
import { motion } from 'framer-motion'
import { downloadInitiatedContext } from './../App';
// import Attribute from './Explore/Attribute';
// import ImageComponent from './Explore/ImageComponent';


interface dropdownType {
    button: boolean,
    text: boolean
}

const ModalShareTemplate = ({ result }: { result: ResultProp }) => {

    const getImageDownloader = useImageDownloader()
    // const { windowWidth } = useWindowResize()
    // const [imgStyle, setImgStyle] = useState({});

    const [showDropdown, setShowDropdown] = useState<dropdownType>({
        button: false,
        text: false
    })
    const [copied, setCopied] = useState<boolean>(false)

    const attributeContext = useContext(downloadInitiatedContext)
    if (!attributeContext) {
        return null
    }
    const { setDownloadInitiated } = attributeContext;

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
        // setDownloadInitiated(false)
    }, [])

    const dropdownVariants = {
        hidden: { scaleY: 0 },
        visible: { scaleY: 1 }
    };

    return (
        <>
            {/* {
                downloadInitiated && (
                    <Attribute result={downloadInitiated} />
                )
            } */}
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
                    <motion.button onClick={() => setShowDropdown(prev => ({ ...prev, button: !prev.button }))} whileTap={{ scale: 0.85 }}>Download {showDropdown.button ? <IoIosArrowUp /> : <IoIosArrowDown />}</motion.button>
                    {
                        showDropdown.button && (
                            <motion.div className='dropdownContentDiv' variants={dropdownVariants} initial={'hidden'} animate={'visible'}>
                                {
                                    Object.entries(result.urls).map(([name, link]) => (
                                        <p key={name} onClick={() => {
                                            getImageDownloader(link, `${result.alt_description}.jpg`);
                                            setDownloadInitiated(result)
                                        }}>{name} <FiDownload /></p>
                                    ))
                                }
                            </motion.div>
                        )
                    }
                </div>
            </div>

            <img onClick={() => window.open(`${window.location.origin}/fullScreenImage/${result.id}`, '_blank')} src={result.urls.regular} className='ModalImage' alt={result.alt_description} style={{ aspectRatio: `${result.width / result.height}`, height: `calc(100vh - 220px)`, maxWidth: '772px' }} />

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
                    <motion.button whileTap={{ scale: 0.85 }} onClick={handleShareLink} style={copied ? { backgroundColor: '#80ff80' } : {}}>{copied ? <><SiTicktick />Copied</> : <><FaShare />Share</>}</motion.button>
                </div>
                <div className="constantData">
                    {/* <div className="details"> */}
                    <p><MdOutlineDateRange />Published on {dateInReadableFormat}</p>
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
                                            <React.Fragment key={name}>
                                                {
                                                    value && (
                                                        <>
                                                            <h3>{name.charAt(0).toUpperCase() + name.slice(1) + ':'}</h3>
                                                            <p>{value ?? ''}</p>
                                                        </>
                                                    )
                                                }
                                            </React.Fragment>
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