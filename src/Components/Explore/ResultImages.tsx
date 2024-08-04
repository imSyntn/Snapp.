import React, { Suspense, lazy, useCallback, useContext, useEffect, useState } from 'react'
import '../../Styles/Explore/ResultImages.scss'
import '../../Styles/Loader.scss'
import { useFetch } from '../../Utils/useFetch'
import { searchContext } from '../Explore'
import Loader from '../Loader'
import { ResultProp } from '../../App.types'
import ImageComponent from './ImageComponent'
import Masonry from 'react-layout-masonry';
// import { downloadInitiatedContext } from '../../App';
// import Attribute from './Attribute'

// import { useWindowResize } from '../../Utils/useWindowResize'

const Modal = lazy(() => import('./Modal'))


// interface sizeType {
//   windowWidth: number,
//   windowHeight: number
// }

const ResultImages = () => {

  const [results, setResults] = useState<ResultProp[]>([])
  const [page, setPage] = useState<number>(1)
  const [count, setCount] = useState<number>(10)
  const [modalIndex, setModalIndex] = useState<number>(-1)

  const [, setUpdate] = useState(false);

  const Context = useContext(searchContext)
  // if(conte)
  // const attributeContext = useContext(downloadInitiatedContext)

  if (!Context) {
    return null;
  }

  // if(!attributeContext) {
  //   return null
  // }

  const { search: { topic: { id }, searchVal } } = Context;
  // const { downloadInitiated, setDownloadInitiated } = attributeContext

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

  // useEffect(() => {
  //   console.log(page, count)
  // }, [page, count])

  useEffect(() => {
    setResults([])
    setPage(1)
    setCount(20)
  }, [id, searchVal])

  useEffect(() => {
    setResults(prev => ([...prev, ...data]))
    // console.log(data)
  }, [data])

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [handleScroll, debounce]);

  // const resizeFunction = useCallback(() => setUpdate(),[])


  useEffect(() => {
    const resizeFunction = () => {
      setUpdate(prev=> !prev)
      console.log(1)
      //   setWindowWidth(document.body.clientWidth);
        
      // console.log('body', windowWidth)
      // console.log(window.innerWidth)
      // console.log('body')
      // console.log((windowWidth < 500) ? 1 : (500 <= windowWidth && windowWidth < 900) ? 2 : 3)
      // console.log((window.innerWidth < 500) ? 1 : (500 <= window.innerWidth && window.innerWidth < 900) ? 2 : 3)
      }
    window.addEventListener('resize', resizeFunction)

    return () => {
        window.removeEventListener('resize', resizeFunction)
    }
}, [])

// const getColumns = () => {
//   if (windowWidth < 500) return 1;
//   if (windowWidth >= 500 && windowWidth < 900) return 2;
//   return 3;
// };


  return (
    <>
      {
        (modalIndex !== -1) && <Suspense fallback={<Loader />}><Modal result={results[modalIndex]} setModalIndex={setModalIndex} /></Suspense>
      }
      {/* {
        downloadInitiated && (
          <Attribute result={downloadInitiated} />
        )
      } */}

      <div className='ResultImages' 
      // style={{overflowX: 'hidden'}}
      >

        {
          (results.length == 0) ? (
            <div className="Loader">
              <Loader />
            </div>
          ) : (
            <Masonry columns={ (window.innerWidth < 550) ? 1 : (500 <= window.innerWidth && window.innerWidth < 1140) ? 2 : 3 } gap={20} columnProps={{
              className: 'MansoryDiv',
              // style: { flex: '0px 0px 0px' },
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
                  new Array(1).fill(1).map((item, index) => (
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