import React, { useState } from 'react'
import { FiAtSign } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import '../../Styles/User/FormTemplate.scss'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const FormTemplate = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)

    return (
        <div className="FormTemplate">
            <form action="" className="form_main">
                <p className="heading">Login</p>
                <div className="inputContainer">
                    <FiAtSign />
                    <input type="text" className="inputField" id="username" placeholder="Username" />
                </div>

                <div className="inputContainer">
                    <FiLock  />
                    <input type={!showPassword ? "password" : "text"} className="inputField" id="password" placeholder="Password" />
                    <div className="eye" onClick={()=> setShowPassword(prev=> !prev)}>
                        {
                            showPassword ? (
                                <FaRegEyeSlash />
                            ) : (
                                <FaRegEye />
                            )
                        }
                    </div>
                </div>


                <button id="button">Submit</button>
                <a href="#">Forgot your password?</a>
                <p>or</p>
                <a href="#">SignUp</a>
            </form>
        </div>
    )
}

export default FormTemplate