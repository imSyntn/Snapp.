import React, { Suspense, lazy, useCallback, useContext, useEffect, useState } from 'react'
import '../../Styles/Explore/ResultImages.scss'
import '../../Styles/Loader.scss'
import { useFetch } from '../../Utils/useFetch'
import { searchContext } from '../Explore'
import Loader from '../Loader'
import { ResultProp } from '../../App.types'
import ImageComponent from './ImageComponent'
import Masonry from 'react-layout-masonry';

const Modal = lazy(() => import('./Modal'))

const ResultImages = () => {

  const [results, setResults] = useState<ResultProp[]>([])
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(10)
  const [modalIndex, setModalIndex] = useState<number>(-1)

  const Context = useContext(searchContext)

  if (!Context) {
    return null;
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
          (results.length == 0) ? (
            <div className="Loader">
              <Loader />
            </div>
          ) : (
            <Masonry columns={{ 300: 1, 500: 2, 900: 3 }} gap={20} columnProps={{
              style: { flex: '0' },
            }}>
              {
                results.map((item, index) => (
                  <React.Fragment key={item.urls.small}>
                    <ImageComponent item={item} index={index} clickEvent={setModalIndex} showUserDetails={true} />
                  </React.Fragment>
                ))
              }
              {
                (results.length != 0) && (
                  new Array(5).fill(1).map((item, index) => (
                    <Loader key={index} />
                  ))
                )
              }
            </Masonry>
          )
        }
      </div>
    </>
  )
}

export default ResultImages