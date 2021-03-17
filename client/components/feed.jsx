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
            <Bg/>
        </div>
    )
}

export default Feed