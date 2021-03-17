import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"

const Feed = (props) => {

    const toggler = () => {
        const iconHolder = document.querySelector('.toggIconHolder')
        const icon = document.getElementById('modeIcon');
        const bar = document.querySelector('.modeToggler')
        const bg = document.getElementById('tsparticles')
        console.log(bg.firstChild)
        if (iconHolder.classList.contains('d')) {
            iconHolder.style.float = 'right'
            iconHolder.classList.remove('d')
            icon.classList.remove('fa-moon')
            icon.style.color = 'orange'
            icon.classList.add('fa-sun')
            iconHolder.style.background = 'white'
            bar.style.background = 'white'
            bg.firstChild.style.backgroundColor="#F5F5F5"
        } else {
            iconHolder.style.float = 'left'
            iconHolder.classList.add('d')
            icon.style.color = 'yellow'
            icon.classList.remove('fa-sun')
            icon.classList.add('fa-moon')
            iconHolder.style.background = '#4F4F4F'
            bar.style.background = 'black'
            bg.firstChild.style.backgroundColor='#4F4F4F'

        }
    }

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
                <div className='togg d-flex flex-column align-items-center'>
                    <h6>Night Mode:</h6>
                    <div className='modeToggler'>
                        <div onClick={() => toggler()} className='toggIconHolder'>
                            <span id='modeIcon' className='fas fa-sun'></span>
                        </div>
                    </div>
                </div>
                <h6 className='foote'> Mason Keiser  © 2021. All rights reserved.</h6>
            </div>
            <Bg/>
        </div>
    )
}

export default Feed