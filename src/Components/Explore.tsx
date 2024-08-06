import { createContext, useState } from 'react'
import '../Styles/Explore/Explore.scss'
import HeroSection from './Explore/HeroSection'
import ResultImages from './Explore/ResultImages'
import { SearchType } from '../App.types'

// import Loader from './Loader'

interface SearchContextType {
  search: SearchType,
  setSearch: React.Dispatch<React.SetStateAction<SearchType>>
}


export const searchContext = createContext<SearchContextType | undefined>(undefined);

const Explore = () => {

  const [search, setSearch] = useState<SearchType>({
    topic: {
      id: '',
      title: '',
      description: ''
    },
    searchVal: ''
  })

  // useEffect(() => {

  // }, [])

  return (
    <div className='Explore'>
      <searchContext.Provider value={{ search, setSearch }}>
        <HeroSection />
        <ResultImages />
      </searchContext.Provider>
    </div>
  )
}

export default Explore