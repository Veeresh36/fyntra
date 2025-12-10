import React, { useState } from 'react'
import style from '../components/forgot.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPass } from '../config/config'

function forgot() {

    let [forgot, setForgot] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    })
    let navigate = useNavigate()

    let textHandler = (e) => {
        let { name, value } = e.target
        setForgot({ ...forgot, [name]: value })
    }

    let submitHandler = async (e) => {
        e.preventDefault()

        if (forgot.password === forgot.confirmPassword) {
            let pattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.*\s).{8,16}$/;

            if (pattern.test(forgot.password)) {
                console.log(forgot);
                let response = await forgotPass({
                    email: forgot.email,
                    password: forgot.password
                })

                if (response.status == 200) {
                    alert(response.message)
                    navigate('/login')
                } else {
                    alert(response.message)
                }
            }else{
                alert("Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            }

        } else {
            alert("Passwords do not match");
        }


    }



    return (
        <>
            <div className={style.passContainer}>
                <form onSubmit={submitHandler}>
                    <h2>Update Your Password</h2>
                    <br />
                    <input type="email" onChange={textHandler} required tabIndex="1" name='email' placeholder='Email' className='form-control' />

                    <input type="password" onChange={textHandler} required tabIndex="1" name='password' placeholder='Password' className='form-control' />

                    <input type="password" onChange={textHandler} required tabIndex="1" name='confirmPassword' placeholder='Confirm Password' className='form-control' />

                    <input type="submit" className={style.btn} />
                </form>
            </div>
        </>
    )
}

export default forgot
