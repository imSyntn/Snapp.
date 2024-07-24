import {useEffect, useState} from 'react'

interface sizeType {
    windowWidth: number,
    windowHeight: number
}

export const useWindowResize = () => {
    const [size, setSize] = useState<sizeType>({
        windowWidth: 0,
        windowHeight: 0
    })

    useEffect(()=> {
        const resizeFunction = () => {
            setSize({
                windowWidth: window.innerWidth,
                windowHeight: window.innerHeight
            })
        }
        window.addEventListener('resize', resizeFunction)

        return ()=> {
            window.removeEventListener( 'resize', resizeFunction)
        }
    },[])

  return {size}
}
