import {} from 'react'
import '../../Styles/Home/Contact.scss'
import { contactOptionsArr } from '../../App.types';
import { MdEmail } from "react-icons/md";
import { ImPhone } from "react-icons/im";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
    
    const contactOptionsArr: contactOptionsArr[] = [{
        type: 'Email',
        details: 'We aim to respond to all messages within 24 hours.',
        data: 'imsyntn@gmail.com',
        Icon: MdEmail
    },{
        type: 'Phone',
        details: 'Follow us on social media for updates and inspiration.',
        data: '+91 8768954027',
        Icon: ImPhone
    },{
        type: 'Office',
        details: 'Join our community and discover the world through images.',
        data: 'Kolkata',
        Icon: FaLocationDot
    },]

  return (
    <div className='ContactSection'>
        <h1>Contact Us</h1>
        <p>Have a question or need support? Feel free to reach out to us.</p>
        <div className="contactOptions">
            {
                contactOptionsArr.map((item)=> (
                    <div className="card" key={item.type}>
                        <item.Icon />
                        <h1>{item.type}</h1>
                        {/* <p>{item.details}</p> */}
                        <p><b><i>{item.data}</i></b></p>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Contact