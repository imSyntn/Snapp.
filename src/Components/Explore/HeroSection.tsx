import { useRef, useState, useContext, useCallback, useEffect } from 'react'
import '../../Styles/Explore/HeroSection.scss'
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useFetch } from '../../Utils/useFetch';
import { searchContext } from '../Explore';
import { motion } from 'framer-motion';

interface LeftRight {
    left: boolean,
    right: boolean
}

const HeroSection = () => {

    const [searchText, setSearchText] = useState<string>('')

    const { loading, data } = useFetch(`https://api.unsplash.com/topics?per_page=30&client_id=${import.meta.env.VITE_ACCESS_KEY}`)

    const context = useContext(searchContext)

    if (!context) {
        return null;
    }

    const { search, setSearch } = context;

    const [showLeftRight, setShowLeftRight] = useState<LeftRight>({
        left: false,
        right: true,
    })

    const topicsDivRef = useRef<HTMLDivElement>(null)
    // const catagoriesRef = useRef<HTMLDivElement>(null)

    const arrowScrollAnimation = useCallback((params: string) => {
        topicsDivRef.current && (topicsDivRef.current.scrollLeft += (params == '+' ? 100 : -100));
        setTimeout(() => {
            if (topicsDivRef.current) {
                if (Math.round(topicsDivRef.current?.scrollLeft) === 0) {
                    setShowLeftRight({
                        left: false,
                        right: true
                    })
                } else if (Math.round(topicsDivRef.current?.scrollLeft) > 0 && Math.round(topicsDivRef.current?.scrollLeft) < Math.round(topicsDivRef.current?.scrollWidth - window.innerWidth)) {
                    setShowLeftRight({
                        left: true,
                        right: true
                    })
                } else {
                    setShowLeftRight({
                        right: false,
                        left: true
                    })
                };
            }
        }, 350)
    }, [topicsDivRef.current])

    const searchImageFunction = useCallback(() => setSearch({
        topic: {
            id: '',
            title: '',
            description: ''
        },
        searchVal: searchText
    }), [searchText])

    // useEffect(() => {
    //     catagoriesRef.current?.addEventListener('scroll', (e) => {
    //         let scrollLeft = e.target?.scrollLeft;
    //         if (e.target?.scrollLeft > scrollLeft) {
    //             console.log('+')
    //         } else {
    //             console.log('-')
    //         }

    //     }, { capture: true })
    // }, [])

    useEffect(()=> {
        if(data.length==0) {
            alert("API limit exceed.")
        }
    },[data])

    return (
        <div className='HeroSection'>
            <div className="catagories" 
            // ref={catagoriesRef}
            >
                <div className="slider" style={(!showLeftRight.left) ? { display: 'none' } : {}} onClick={() => arrowScrollAnimation('-')}><FaChevronLeft /></div>
                <div className="topicsDiv" ref={topicsDivRef}>
                    {
                        (!loading && data.length > 0)&& data.map((item, index) => (
                            <motion.p key={item.title + index}
                                onClick={() => setSearch({
                                    topic: {
                                        id: item.id,
                                        title: item.title,
                                        description: item.description
                                    },
                                    searchVal: ''
                                })}
                                whileTap={{ scale: 0.85 }} >{item.title}</motion.p>
                        ))
                    }
                </div>
                <div className="slider" style={(!showLeftRight.right) ? { display: 'none' } : {}} onClick={() => arrowScrollAnimation('+')}><FaChevronRight /></div>
            </div>
            <div className="search-Text">
                <div className="text">
                    <h1>
                        {
                            (search.topic.title !== '') ? search.topic.title :
                                (search.searchVal !== '') ? search.searchVal : 'Random'
                        }
                    </h1>
                    {
                        search.topic.id && (
                            <p>{search.topic.description}</p>
                        )
                    }
                </div>
                <div className="searchDiv">
                    <input type="text" name="" id="" placeholder='Search here...' onChange={(e) => setSearchText(e.target.value)} onKeyDown={(e) => {
                        if (e.key == 'Enter') {
                            searchImageFunction()
                            setSearchText('')
                        }
                    }} value={searchText}
                    />
                    <motion.div className="svgWrapper" onClick={searchImageFunction} whileTap={{ scale: 0.85 }}>
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>

                </div>
            </div>
        </div>
    )
}

export default HeroSection