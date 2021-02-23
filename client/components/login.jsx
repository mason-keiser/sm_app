import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Login = (props) => {

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
        const eye = document.getElementById('eye')
        const pass = document.getElementById('password')
        console.log(pass.type)
        if (eye.classList.contains('show')) {
            eye.classList.remove('fa-eye-slash')
            eye.classList.remove('show')
            pass.type = 'text'
            eye.classList.add ('fa-eye')
        } else {
            eye.classList.add('fa-eye-slash')
            eye.classList.add('show')
            pass.type = 'password'
            eye.classList.remove('fa-eye')
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
            <div className='loginFormCont'>
              <h2 className='title2'> Login </h2>
                <form id='loginForm' style={{zIndex: '999'}}>
                    <div className='form-group'>
                        <label htmlFor="email">Username: </label>
                        <div className='d-flex'>
                            <span className='fas fa-user'></span>
                            <input type="text" autoComplete='current-username' placeholder='Enter Username' name='email' className="" id='email'/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Password:</label>
                        <div className='d-flex'>
                            <span className='fas fa-lock'></span>
                            <input type="password" placeholder='Enter Password' autoComplete='current-password' name='password' className="" id='password'/>
                            <span onClick={() => passEye()} id='eye' className='fas fa-eye-slash show'></span>
                        </div>
                    </div>
                    <div id="required" className="required"></div>
                    <div className='loginButton'>
                         <button type='submit' className='btn mt-2'>Login</button>
                    </div>
                    <div className='altButtons'>
                        <h5>Login As Guest</h5>
                        <h5>Sign Up</h5>
                    </div>
                </form>
            </div>
            <h6 className='footer'> Mason Keiser  © 2021. All rights reserved.</h6>
            <div id='side'  className='hamCont'>
                <h2 onClick={() => handleMenu()} className='x fa fa-times'></h2>
                <h3 className='m-4'>Sign Up</h3>
                <h3 className='m-2' onClick={() => props.setView({name: 'init', params: {}})}>◄ Back Home</h3>
                <h4>üConnect © 2021</h4 >
            </div>
            <Bg/>
        </div>
    )
}

export default Login