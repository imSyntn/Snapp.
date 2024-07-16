import { memo, useState } from 'react'
import '../Styles/ModalShareTemplate.scss'
import { ResultProp } from '../App.types'
import { useAbcType } from '../Utils/useAbcType';
import { useDateTime } from '../Utils/useDateTime';

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { FaShare, FaInstagram } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FiDownload } from "react-icons/fi";
import { FaCcPaypal, FaXTwitter } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";

interface dropdownType {
    button: boolean,
    text: boolean
}

const ModalShareTemplate = ({ result }: { result: ResultProp }) => {

    const [showDropdown, setShowDropdown] = useState<dropdownType>({
        button: false,
        text: false
    })

    const AbcType = useAbcType(result.alt_description)
    const dateInReadableFormat = useDateTime(result.created_at)

    return (
        <>
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
                            <div className='dropdownContentDiv'>
                                {result.urls.raw && <p>Raw <FiDownload /></p>}
                                {result.urls.full && <p>Full <FiDownload /></p>}
                                {result.urls.regular && <p>Regular <FiDownload /></p>}
                                {result.urls.small && <p>Small <FiDownload /></p>}
                            </div>
                        )
                    }
                </div>
            </div>
            <img src={result.urls.regular} className='ModalImage' alt="Image" style={{ aspectRatio: `${result.width}/${result.height}` }} />
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
                    <button><FaShare />Share</button>
                </div>
                <div className="constantData">
                    <div className="details">
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
                                    <div className="dropdownContentDiv">
                                        <h3>Camera</h3>
                                        <p>{result.exif.make ?? ''}</p>
                                        <h3>Model</h3>
                                        <p>{result.exif.model ?? ''}</p>
                                        <h3>ISO</h3>
                                        <p>{result.exif.iso ?? ''}</p>
                                        <h3>Focal Length</h3>
                                        <p>{result.exif.focal_length ?? ''}</p>
                                        <h3>Aperture</h3>
                                        <p>{result.exif.aperture ?? ''}</p>
                                        <h3>Exposure Time</h3>
                                        <p>{result.exif.exposure_time ?? ''}</p>
                                    </div>
                                }
                                <p onClick={() => setShowDropdown(prev => ({ ...prev, text: !prev.text }))}>< FiCamera />{result.exif.name}{showDropdown.text ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                            </div>
                        }
                        <p><IoShieldCheckmarkOutline />Free to use under<a target='_blank' href="https://unsplash.com/license">Unsplash Lisence</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(ModalShareTemplate)