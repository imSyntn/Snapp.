import {} from 'react'

export const useImageDownloader = () => {
    return async (imageUrl: string, fileName: string) => {
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
}