import { useEffect, useState } from 'react'
import '../../Styles/Home/ImageCarousel.scss'
import { RandomImage } from '../../App.types'


const ImageCarousel = () => {

  const [images, setImages] = useState<RandomImage[]>([])

  useEffect(() => {

    // const getRandomImages = async () => {
    //   try {

    //     const req = await fetch(`https://api.unsplash.com/photos/random?count=5&client_id=${import.meta.env.VITE_ACCESS_KEY}`)
    //     const res = await req.json()
    //     // console.log(res)
    //     setImages(res)

    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // getRandomImages()

  }, [])

  useEffect(() => {
    console.log(images)
  }, [images])

  return (
    <div className='ImageCarousel'>
      {
        // images.map((item, index) => (
        //   <div key={index}>
        //     <img src={item.urls.small} alt="" />
        //     <img src={item.urls.small} alt="" />
        //   </div>
        // ))
        new Array(10).fill(1).map((item, index) => (
          <div key={item*index}>
            <img src='https://images.unsplash.com/photo-1717699967168-9ccd317a0524?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzAzNTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjAzNjM2NTF8&ixlib=rb-4.0.3&q=80&w=1080' alt="" />
            {/* <img src={item.urls.small} alt="" /> */}
          </div>
        ))
      }
    </div>
  )
}

export default ImageCarousel