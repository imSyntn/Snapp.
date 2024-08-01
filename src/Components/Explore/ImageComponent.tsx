import { useState, useEffect } from 'react'
import { useImageDownloader } from '../../Utils/useImageDownloader'
// import { useWindowResize } from '../../Utils/useWindowResize';
import { FaDownload } from "react-icons/fa6";
import { ResultProp } from '../../App.types';

const ImageComponent = ({ item, index, clickEvent, showUserDetails }: { item: ResultProp, index?: number, clickEvent: Function, showUserDetails: boolean }) => {

    const getImageDownloader = useImageDownloader()


    const [imageLoaded, setImageLoaded] = useState<boolean>(false)

    // useEffect(()=> {
        
    // },[])

    // const getSize = () => {
    //     if (item.width > item.height) {

    //         // return { aspectRatio: item.height / item.width }
    //     } else if (item.height> item.width) {
    //         return { aspectRatio: item.width / item.height }
    //     }
    // }

    return (
        <div className="imageWrapper" style={!imageLoaded ? { backgroundColor: item.color} : {}} onClick={() => clickEvent(index)}>
            <img src={item.urls.small} loading='lazy' 
            style={{ aspectRatio: item.width / item.height }} 
            alt={item.alt_description} onLoad={() => setImageLoaded(true)} />
            {
                showUserDetails && (
                    <div className="userDetails">
                        <div className="user">
                            <img src={item.user.profile_image.medium} alt={item.alt_description} loading='lazy' />
                            <p>{item.user.name}</p>
                        </div>
                        <button className="downloadIcon" onClick={(e) => {
                            e.stopPropagation()
                            getImageDownloader(item.urls.raw || item.urls.full || item.urls.regular, `${item.alt_description}.jpg`)
                        }}>
                            <FaDownload />
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default ImageComponent