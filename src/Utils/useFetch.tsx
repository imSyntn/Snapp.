import { useState, useEffect } from 'react'
import { ResultProp } from '../App.types'

export const useFetch = (prop: string) => {

    const [loading, setLoading] = useState<boolean>(true)
    const [data, setData] = useState<ResultProp[]>([])
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        const getData = async () => {
            if (prop == '') {
                setLoading(false)
                return;
            }
            try {
                setLoading(true)
                const req = await fetch(prop, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const res = await req.json()
                // if()
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