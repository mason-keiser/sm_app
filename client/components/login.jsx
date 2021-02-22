import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Login = (props) => {
    
    return (
        <div>
            <div className='landingNav'>
                <h1 className='ham fas fa-bars'></h1>
                <div className='dateHolder'>
                    <h4 className="date2 border-0 m-3">{props.dateBuilder(new Date())}</h4>
                    <h4>{props.formatAMPM(new Date())}</h4>
                </div>
            </div>
            <Bg/>
        </div>
    )
}

export default Login