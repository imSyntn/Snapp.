import { IconType } from "react-icons"

type ImageLinks = {
    full: string,
    regular: string,
    small: string
}
export interface RandomImage {
    id: string,
    urls : ImageLinks
}
export interface NameDescObj {
    name: string,
    desc: string,
    img: string
}
export interface contactOptionsArr {
    type: string,
    details: string,
    data: string,
    Icon: IconType
}