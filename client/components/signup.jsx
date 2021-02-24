import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Signup = (props) => {

    const [user_name, setUserName] = useState('');
    const [user_password1, setUserPassword1] = useState('');
    const [user_password2, setUserPassword2] = useState('');

    const handleSubmit = (callback) => {
        event.preventDefault()
        let newPass = null
        if (user_password1 === user_password2) {
            newPass = user_password1
        } else {
            return null
        }
        event.preventDefault()
        const obj = {
            user_name: user_name,
            user_password: newPass,
        }
        if (!obj) {
           return null
        } else {
        callback(obj)
        }
    }

    const handleChange = (event) => {
        if (event.target.id === 'user_name') {
            setUserName(`@${event.target.value}`)
        }
        if (event.target.id === 'password1') {
            setUserPassword1(event.target.value)
        }
        if (event.target.id === 'password2') {
            setUserPassword2(event.target.value)
        }
    } 

    const handleMenu = () => {
        const ham = document.getElementById('side');
        const icon = document.getElementById('ham');
        if (ham.classList.contains('open')) {
            ham.classList.remove('open') 
            icon.style.color = 'black'
        } else {
            ham.classList.add('open')
            icon.style.color ='black'
            icon.style.color = 'transparent'
        }
    }

    const passEye = () => {
        const eye1 = document.querySelector('#eye1')
        const eye2 = document.querySelector('#eye2')
        const pass1 = document.querySelector('.pass1')
        const pass2 = document.querySelector('.pass2')
        if (eye1.classList.contains('show')) {
            eye1.classList.remove('fa-eye-slash')
            eye1.classList.remove('show')
            pass1.type = 'text'
            eye1.classList.add ('fa-eye')
        } else {
            eye1.classList.add('fa-eye-slash')
            eye1.classList.add('show')
            pass1.type = 'password'
            eye1.classList.remove('fa-eye')
        } if (eye2.classList.contains('show')) {
            eye2.classList.remove('fa-eye-slash')
            eye2.classList.remove('show')
            pass2.type = 'text'
            eye2.classList.add ('fa-eye')
        } else {
            eye2.classList.add('fa-eye-slash')
            eye2.classList.add('show')
            pass2.type = 'password'
            eye2.classList.remove('fa-eye')
        }
    }
    
    return (
        <div>
            <div className='landingNav'>
                <h1 onClick={() => handleMenu()} id='ham' className='ham fas fa-bars'></h1>
                <div className='dateHolder'>
                    <h4 className="date2 border-0 m-3">{props.dateBuilder(new Date())}</h4>
                    <h4>{props.formatAMPM(new Date())}</h4>
                </div>
            </div>
            <div className='signUpFormCont'>
              <h2 className='title2'> Sign Up </h2>
                <form onSubmit={() => handleSubmit(props.signup)} id='signUpForm' style={{zIndex: '999'}}>
                    <div className='form-group'>
                        <label htmlFor="email">Username: </label>
                        <div className='d-flex'>
                            <span className='fas fa-user'></span>
                            <input type="text" autoComplete='current-username' placeholder='Enter Username' name='email' className="" onChange={handleChange} id='user_name'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password:</label>
                        <div className='d-flex'>
                            <span className='fas fa-lock'></span>
                            <input type="password" placeholder='Enter Password' autoComplete='current-password' name='password' className="pass1" onChange={handleChange} id='password1'/>
                            <span onClick={() => passEye(event)} title='1' id='eye1' className='fas fa-eye-slash show'></span>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Re-Enter Password:</label>
                        <div className='d-flex'>
                            <span className='fas fa-lock'></span>
                            <input type="password" placeholder='Re-Enter Password' autoComplete='current-password' name='password' className="pass2" onChange={handleChange} id='password2'/>
                            <span onClick={() => passEye()} title='2' id='eye2' className='fas fa-eye-slash show'></span>
                        </div>
                    </div>
                    <div id="required" className="required"></div>
                    <div className='signUpButton'>
                         <button type='submit' className='btn mt-2'>Sign Up</button>
                    </div>
                    <div className='altButtons'>
                        <h5 onClick={() => props.loginAsGuest()}>Login As Guest</h5>
                        <h5 onClick={() => props.setView({name: 'login', params: {}})}>Login</h5>
                    </div>
                </form>
            </div>
            <h6 className='footer'> Mason Keiser  © 2021. All rights reserved.</h6>
            <div id='side'  className='hamCont'>
                <h2 onClick={() => handleMenu()} className='x fa fa-times'></h2>
                <h3 className='m-4' onClick={() => props.setView({name: 'login', params: {}})}>Login</h3>
                <h3 className='m-2' onClick={() => props.setView({name: 'init', params: {}})}>◄ Back Home</h3>
                <h4>üConnect © 2021</h4 >
            </div>
            <Bg/>
        </div>
    )
}

export default Signup