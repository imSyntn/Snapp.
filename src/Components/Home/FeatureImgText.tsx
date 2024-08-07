import {} from 'react'
import '../../Styles/Home/FeatureImgText.scss'



const FeatureImgText = ({img, name, desc} : {img: string, name:string, desc: string}) => {
    return (
        <div className='FeatureImgText'>
            <img src={img} alt={name} />
            <div className="text">
                <h1>{name}</h1>
                <p>{desc}</p>
            </div>
        </div>
    )
}

export default FeatureImgText