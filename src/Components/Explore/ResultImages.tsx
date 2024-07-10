import { useCallback, useContext, useEffect, useState } from 'react'
import '../../Styles/Explore/ResultImages.scss'
import '../../Styles/Loader.scss'
import { useFetch } from '../../Utils/useFetch'
import { searchContext } from '../Explore'
import Loader from '../Loader'
import { ResultProp } from '../../App.types'

const ResultImages = () => {

  const [results, setResults] = useState<ResultProp[]>([])
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(10)

  const Context = useContext(searchContext)

  if (!Context) {
    throw new Error("Context Does not exist!")
  }

  const { search: { topic: { id }, searchVal } } = Context;

  const fetchUrl = (id !== '') ? `https://api.unsplash.com/topics/${id}/photos?page=${page}&&client_id=${import.meta.env.VITE_ACCESS_KEY}` : (searchVal !== '') ? `https://api.unsplash.com/search/photos?page=${page}&query=${searchVal}&client_id=${import.meta.env.VITE_ACCESS_KEY}` : `https://api.unsplash.com/photos/random?count=${count}&client_id=${import.meta.env.VITE_ACCESS_KEY}`

  const { loading, data } = useFetch(fetchUrl)

  const handelScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= (scrollHeight - 30) && !loading) {
      (id=='' && searchVal =='') ? setCount(prev => prev + 10) :setPage(prev => prev + 1)
    }
  },[loading])

  useEffect(()=> {
    console.log(page, count)
  },[page,count])

  useEffect(() => {
    setResults([])
    setPage(1)
    setCount(10)
  }, [id, searchVal])

  useEffect(() => {
    setResults(prev => ([...prev, ...data]))
  }, [data])

  useEffect(() => {
    window.addEventListener('scroll', handelScroll)
    return () => {
      window.removeEventListener('scroll', handelScroll)
    }
  }, [handelScroll])

  return (
    <div className='ResultImages'>
      {
        (results.length == 0) ? (
          <div className="Loader">
            <Loader />
          </div>
        ) : (
          <>
            {
              results.map(item => (
                <img key={item.urls.small} src={item.urls.small} style={{ aspectRatio: item.width / item.height }} alt='' />
              ))
            }
            {
              loading && (
                <div className="Loader">
                  <Loader />
                </div>
              )
            }
          </>
        )
      }
    </div>
  )
}

export default ResultImages