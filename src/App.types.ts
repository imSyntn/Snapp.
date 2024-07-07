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