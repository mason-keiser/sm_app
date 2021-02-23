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
    
    return (
        <div>
            <div className='landingNav'>
                <h1 onClick={() => handleMenu()} id='ham' className='ham fas fa-bars'></h1>
                <div className='dateHolder'>
                    <h4 className="date2 border-0 m-3">{props.dateBuilder(new Date())}</h4>
                    <h4>{props.formatAMPM(new Date())}</h4>
                </div>
            </div>
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