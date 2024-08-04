import { IconType } from "react-icons"

type ImageLinks = {
    raw: string,
    full: string,
    regular: string,
    small: string
}
type UserProp = {
    first_name: string,
    id: string,
    last_name: string,
    links: { html: string },
    name: string,
    profile_image: { medium: string },
    social: {
        instagram_username: string,
        portfolio_url: string,
        twitter_username: string,
        paypal_email: string
    },
    updated_at: string,
    username: string,
}
export interface ResultProp {
    id: string,
    slug: string,
    urls: ImageLinks,
    title: string,
    color: string,
    description: string,
    width: number,
    height: number,
    alt_description: string,
    created_at: string,
    downloads: string,
    views: number,
    user: UserProp,
    links: { download: string },
    location: {
        name: string | null,
        city: string | null,
        country: string | null
    },
    exif: {
        aperture: string,
        exposure_time: string,
        focal_length: string,
        iso: number,
        make: string,
        model: string,
        name: string
    }
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

// export interface UserLoginProp {
//     userName: string
// }