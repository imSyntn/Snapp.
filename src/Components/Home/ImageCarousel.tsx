import { useEffect } from 'react'
import '../../Styles/Home/ImageCarousel.scss'
import { useFetch } from '../../Utils/useFetch'


const ImageCarousel = () => {

  const { loading, data } = useFetch(`https://api.unsplash.com/photos/random?count=20&client_id=${import.meta.env.VITE_ACCESS_KEY}`)


  useEffect(() => {
    if (!loading && data.length == 0) {
      alert("API limit exceed.")
    }
  }, [data])

  return (
    <div className='ImageCarousel'>
      <div className="wrapper">
        {
          data.length > 0 && (
            data.map((item) => (
              <div className='imagesContainer' key={item.id} style={{ backgroundColor: item.color || 'gray' }}>
                <img src={item.urls.small} alt="" />
              </div>
            ))
          )
        }
      </div>
    </div>
  )
}

export default ImageCarousel