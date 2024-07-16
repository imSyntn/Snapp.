import {useEffect, useState} from 'react'

export const useAbcType = (param: string) => {

  const [str, setStr] = useState<string>('')

  useEffect(()=> {
    setStr(param.charAt(0).toUpperCase() + param.slice(1) + '.')
  },[param])

  return str;
}