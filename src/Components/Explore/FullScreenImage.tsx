import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ResultProp } from '../../App.types'

const FullScreenImage = () => {

    const { id } = useParams()

    const [data, setData] = useState<ResultProp | false>(false)

    const fetchUrl = `https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.VITE_ACCESS_KEY}`

    // const { loading, data } = useFetch(fetchUrl)

    useEffect(() => {
        const getData = async () => {
            try {
                const req = await fetch(fetchUrl)
                const res = await req.json();
                console.log(res)
                setData(res)

            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])

    return (
        <div className='FullScreenImage' data-lenis-prevent style={{height: '100vh', width: '100%',position:'fixed', zIndex: '100', top: '0', overflow: 'auto', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {
                data && (
                    <img src={data.urls.raw || data.urls.full || data.urls.regular} alt="requested fullscreen view of image" style={{width: `${data.width}`, height: `${data.height}`}}  />
                )
            }
        </div>
    )
}

export default FullScreenImage