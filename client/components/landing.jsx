import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Landing = (props) => {

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${month} ${date}, ${year}`
    }

    const formatAMPM = (d) => {
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      }

    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return (
        <div className='appCont'>
            <div className='landingNav'>
                <h1 className='ham fas fa-bars'></h1>
                <div className='dateHolder'>
                    <h4 className="date2 border-0 m-3">{dateBuilder(new Date())}</h4>
                    <h4>{formatAMPM(new Date())}</h4>
                </div>
            </div>
            <div className='landingTitle'>
                <h1>ÜConnect</h1>
                <h5>Click Here to Login</h5>
                <h6> Mason Keiser  © 2021. All rights reserved.</h6>
            </div>
            <Bg/>
        </div>
    )
}

export default Landing