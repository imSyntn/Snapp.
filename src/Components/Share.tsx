import { useEffect, useState } from 'react'
import '../Styles/Share.scss'
import { useParams } from 'react-router-dom'
import ModalShareTemplate from './ModalShareTemplate'
import { useFetch } from '../Utils/useFetch'

const Share = () => {

    const { id } = useParams<{id:string}>()

    const fetchUrl = `https://api.unsplash.com/photos/${id}/photos?&client_id=${import.meta.env.VITE_ACCESS_KEY}`

    // const { loading, data } = useFetch(fetchUrl)

    // useEffect(() => {
    //     console.log(data)
    // }, [data])


    return (
        <div className='Share'>ffgd
            {/* <ModalShareTemplate result={data} /> */}
        </div>
    )
}

export default Share