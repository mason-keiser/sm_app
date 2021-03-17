import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Feed = (props) => {

    return (
        <div>
            <div className='landingNav'>
                <div className='dateHolder'>
                    <h4 className="date2 border-0 m-3">{props.dateBuilder(new Date())}</h4>
                    <h4 id='time'>{props.formatAMPM(new Date())}</h4>
                </div>
            </div>
            <div className='sideMenu'>
                <h3 className='menTit mt-3'>üConnect</h3>
                <div className='profileTag'>
                    <div className='fas fa-user'></div>
                    <h4>My Profile</h4>
                </div>
                <div>
                    <h6>Night Mode:</h6>
                    <div className='modeToggler'>

                    </div>
                </div>
                <h6 className='foote'> Mason Keiser  © 2021. All rights reserved.</h6>
            </div>
            <Bg/>
        </div>
    )
}

export default Feed