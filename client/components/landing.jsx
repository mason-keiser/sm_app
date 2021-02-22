import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Landing = (props) => {

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
        <div className='appCont'>
            <div className='landingNav'>
                <h1 onClick={() => handleMenu()} id='ham' className='ham fas fa-bars'></h1>
                <div className='dateHolder'>
                    <h4 className="date2 border-0 m-3">{props.dateBuilder(new Date())}</h4>
                    <h4>{props.formatAMPM(new Date())}</h4>
                </div>
            </div>
            <div className='landingTitle'>
                <h1>üConnect</h1>
                <h5 onClick= {() => props.setView({name: 'login', params: {}})}>Click Here to Login</h5>
                <h6> Mason Keiser  © 2021. All rights reserved.</h6>
            </div>
            <div id='side'  className='hamCont'>
                <h2 onClick={() => handleMenu()}className='x fa fa-times'></h2>
                <h3 className='m-4' onClick={() => props.setView({name: 'login', params: {}})}>Login</h3>
                <h3 className='m-2'>Sign Up</h3>
                <h4>Mason Keiser © 2021</h4 >
            </div>
            <Bg/>
        </div>
    )
}

export default Landing