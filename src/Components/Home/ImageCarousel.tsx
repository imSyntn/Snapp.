import { } from 'react'
import '../../Styles/Home/ImageCarousel.scss'
import { useFetch } from '../../Utils/useFetch'


const ImageCarousel = () => {

  // const [images, setImages] = useState<ResultProp[]>([])


  // const { loading, data, error } = useFetch(`https://api.unsplash.com/photos/random?count=20&client_id=${import.meta.env.VITE_ACCESS_KEY}`)


  return (
    <div className='ImageCarousel'>
      <div className="wrapper">
        {
          new Array(20).fill(1).map((item, index) => (
            <div className='imagesContainer' key={item * index}>
              <img src='https://images.unsplash.com/photo-1720596577871-2b6c72c40de9?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default ImageCarousel