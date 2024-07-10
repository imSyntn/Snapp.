import { IconType } from "react-icons"

type ImageLinks = {
    full: string,
    regular: string,
    small: string
}
export interface ResultProp {
    id: string,
    slug: string,
    urls : ImageLinks,
    title: string,
    description: string,
    width: number,
    height: number
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

export interface TopicType {
    id: string,
    title: string,
    description: string
}
export interface SearchType {
    topic: TopicType,
    searchVal: string
  }