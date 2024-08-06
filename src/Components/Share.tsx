import { useEffect, useState } from 'react'
import '../Styles/Share.scss'
import { useParams } from 'react-router-dom'
import ModalShareTemplate from './ModalShareTemplate'
// import { useFetch } from '../Utils/useFetch'
import { ResultProp } from '../App.types'
import Loader from './Loader'

const Share = () => {

    const { id } = useParams<{id:string}>()

    const [data, setData] = useState<ResultProp | false>(false)

    const fetchUrl = `https://api.unsplash.com/photos/${id}?client_id=${import.meta.env.VITE_ACCESS_KEY}`

    // const { loading, data } = useFetch(fetchUrl)

    useEffect(() => {
        const getData = async() => {
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
        <div className='Share' style={data ? {height: '100hv'} : {height: 'fit-content'}}>
            {
                data ? (
                    <ModalShareTemplate result={data} />
                ) : (
                    <div className="Loader" style={{height: `calc(100vh - 60.8px - 104.6px - 20px)`}}>
                        <Loader />
                    </div>
                )
            }
        </div>
    )
}

export default Share