import { Suspense, lazy, useCallback, useContext, useEffect, useState } from 'react'
import '../../Styles/Explore/ResultImages.scss'
import '../../Styles/Loader.scss'
import { useFetch } from '../../Utils/useFetch'
import { searchContext } from '../Explore'
import Loader from '../Loader'
import { ResultProp } from '../../App.types'
import { FaDownload } from "react-icons/fa6";

const Modal = lazy(() => import('./Modal'))

const ResultImages = () => {

  const [results, setResults] = useState<ResultProp[]>([])
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(10)
  const [modalIndex, setModalIndex] = useState<number>(-1)

  const Context = useContext(searchContext)

  if (!Context) {
    throw new Error("Context Does not exist!")
  }

  const { search: { topic: { id }, searchVal } } = Context;

  const fetchUrl = (id !== '') ? `https://api.unsplash.com/topics/${id}/photos?page=${page}&&client_id=${import.meta.env.VITE_ACCESS_KEY}` : (searchVal !== '') ? `https://api.unsplash.com/search/photos?page=${page}&query=${searchVal}&client_id=${import.meta.env.VITE_ACCESS_KEY}` : `https://api.unsplash.com/photos/random?count=${count}&client_id=${import.meta.env.VITE_ACCESS_KEY}`

  const { loading, data } = useFetch(fetchUrl)
  // const loading = true

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= (scrollHeight - 200) && !loading) {
      (id == '' && searchVal == '') ? setCount(prev => prev + 20) : setPage(prev => prev + 1)
    }
  }, [loading, id, searchVal])

  const debounce = (func: Function, wait: number) => {
    let timeout: any;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(), wait);
    };
  };

  const handleImageDownload = async (imageUrl: string, fileName: string) => {
    try {
      const req = await fetch(imageUrl)
      const res = await req.blob()
      const url = URL.createObjectURL(res)
      const link = document.createElement('a')
      link.href = url,
        link.download = fileName;
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(page, count)
  }, [page, count])

  useEffect(() => {
    setResults([])
    setPage(1)
    setCount(20)
  }, [id, searchVal])

  useEffect(() => {
    setResults(prev => ([...prev, ...data]))
    console.log(data)
  }, [data])

  // useEffect(() => {
  //   const debouncedHandleScroll = debounce(handleScroll, 100);
  //   window.addEventListener('scroll', debouncedHandleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', debouncedHandleScroll);
  //   };
  // }, [handleScroll, debounce]);

  return (
    <>
      {
        (modalIndex !== -1) && <Suspense fallback={<Loader />}><Modal result={results[modalIndex]} setModalIndex={setModalIndex} /></Suspense>
      }

      <div className='ResultImages'>

        {

          // new Array(20).fill(1).map((item, index) => (
          //   <img src="https://images.unsplash.com/photo-1719150016704-270c5a0deee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzAzNTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjA2Nzc3NTh8&ixlib=rb-4.0.3&q=80&w=400" key={index} alt="" />
          // ))

          (results.length == 0) ? (
            <div className="Loader">
              <Loader />
            </div>
          ) : (
            <>
              {
                results.map((item, index) => (
                  <div className="imageWrapper" key={item.urls.small} style={{ aspectRatio: item.width / item.height }} onClick={()=> setModalIndex(index)}>
                    <img src={item.urls.small} style={{ aspectRatio: item.width / item.height }} alt={item.alt_description} />
                    <div className="userDetails">
                      <div className="user">
                        <img src={item.user.profile_image.medium} alt="" />
                        <p>{item.user.name}</p>
                      </div>
                      <button className="downloadIcon" onClick={() => handleImageDownload(item.urls.raw || item.urls.full, `${item.alt_description}.jpg`)}>
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                ))
              }
              {
                // <div className="Loader">
                loading && <Loader />
                // </div> 

              }
            </>
          )
        }

      </div>
    </>
  )
}

export default ResultImages