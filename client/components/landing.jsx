import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Landing = (props) => {

    return (
        <div className='appCont'>
            <div className='landingNav'>
                <h1 className='ham fas fa-bars'></h1>
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
            <Bg/>
        </div>
    )
}

export default Landing