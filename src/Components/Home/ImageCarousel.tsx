import { } from 'react'
import '../../Styles/Home/ImageCarousel.scss'
import { useFetch } from '../../Utils/useFetch'


const ImageCarousel = () => {

  const { data } = useFetch(`https://api.unsplash.com/photos/random?count=20&client_id=${import.meta.env.VITE_ACCESS_KEY}`)


  return (
    <div className='ImageCarousel'>
      <div className="wrapper">
        {
          data.map((item) => (
            <div className='imagesContainer' key={item.id} style={{ backgroundColor: item.color || 'gray' }}>
              <img src={item.urls.small} alt="" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ImageCarousel