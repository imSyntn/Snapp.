import { useState, useEffect } from 'react'
import { ResultProp } from '../App.types'

export const useFetch = (prop: string) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<ResultProp[]>([])
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            console.log(prop)
            // if (!prop) {
            //     setLoading(false)
            //     return;
            // };
            if(prop == '') {
                setLoading(false)
                return;
            }
            try {
                setLoading(true)
                const req = await fetch(prop);
                const res = await req.json()
                setData(res.results || res)
            } catch (error) {
                setError(true)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [prop])

    return { loading, data, error }
}