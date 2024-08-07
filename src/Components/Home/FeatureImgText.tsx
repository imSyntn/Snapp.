import { } from 'react'
import '../../Styles/Home/FeatureImgText.scss'
import { motion } from 'framer-motion'



const FeatureImgText = ({ img, name, desc, index }: { img: string, name: string, desc: string, index: number }) => {
    return (
        <div className='FeatureImgText'>
            <motion.img src={img} alt={name} initial={(index % 2 == 0) ? {
                x: -200,
                opacity:0
            } : {
                x: 200,
                opacity:0
            }} whileInView={{ x: 0, opacity:1, transition:{duration:0.5} }} />

            <motion.div className="text" initial={(index % 2 == 0) ? {
                x: 200,
                opacity:0
            } : {
                x: -200,
                opacity:0
            }} whileInView={{ x: 0, opacity:1, transition: { duration: 0.5 } }}>
                <h1>{name}</h1>
                <p>{desc}</p>
            </motion.div>
        </div>
    )
}

export default FeatureImgText