import {useState, useEffect} from 'react'

export const useDateTime = (param: string) => {

    const [fullDateTime, setFullDateTime] = useState<string>('')

    const addZero = (param:number) => (param<=9) ? ("0"+param) : param;

    useEffect(()=> {
      const dateObj = new Date(param);
      const date = addZero(dateObj.getDate()) + '/' + addZero(dateObj.getMonth()+1) + '/' + dateObj.getFullYear() + ' ' + 'at' + ' ' + addZero(dateObj.getHours()) +':'+ addZero(dateObj.getMinutes())
      
      setFullDateTime(date)
    },[param])

  return fullDateTime;
}