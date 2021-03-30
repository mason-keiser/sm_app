import React from 'react'
import { useEffect, useState } from "react"
import Bg from "./bg"

const My_Profile = (props) => {

    useEffect(() => {
        const iconHolder = document.querySelector('.toggIconHolder')
        const icon = document.getElementById('modeIcon');
        const bar = document.querySelector('.modeToggler')
        const bg = document.getElementById('tsparticles')
        const words = document.querySelectorAll('.nm')                
        const userI = document.getElementById('userI')
        const menu = document.getElementById('menu')
        const image = document.querySelectorAll('.profileImageCont')

        if (props.nightMode == false) {
            for (let i = 0; i < words.length; i++ ) {
                words[i].style.color = 'black'
                words[i].style.borderColor = 'black'
            }
            for (let j = 0; j < image.length; j++) {
                image[j].style.color = 'black'
                image[j].style.background = 'white'
            }
            userI.style.color = 'black'
            iconHolder.style.float = 'right'
            iconHolder.classList.remove('d')
            icon.classList.remove('fa-moon')
            icon.style.color = 'orange'
            icon.classList.add('fa-sun')
            iconHolder.style.background = '#F5F5F5'
            bar.style.background = 'white'
            bg.firstChild.style.backgroundColor="#F5F5F5"
            menu.style.background ='#F5F5F5'
        } if (props.nightMode == true) {
            for (let i = 0; i < words.length; i++ ) {
                words[i].style.color = 'white'
                words[i].style.borderColor = 'white'
            }
            for (let j = 0; j < image.length; j++) {
                image[j].style.color = 'white'
                image[j].style.background = 'black'
            }
            userI.style.color = 'white'
            iconHolder.style.float = 'left'
            iconHolder.classList.add('d')
            icon.style.color = 'yellow'
            icon.classList.remove('fa-sun')
            icon.classList.add('fa-moon')
            iconHolder.style.background = '#262626'
            bar.style.background = 'black'
            bg.firstChild.style.backgroundColor='#262626'
            menu.style.background ='#262626'
        }
    },[props.nightMode])

    return (
        <div>
             <div className='landingNav'>
                <div className='dateHolder'>
                    <h4 className=" nm date2 border-0 m-3">{props.dateBuilder(new Date())}</h4>
                    <h4 id='time' className='nm'>{props.formatAMPM(new Date())}</h4>
                </div>
            </div>
            <div className='columnCont'>
                <div id='menu'className='sideMenu'>
                    <h3 className='menTit mt-3 nm'>üConnect</h3>
                    <div className='profileTag'>
                        <div id='userI' className='fas fa-user'></div>
                        <h5 className='nm'>My Profile</h5>
                    </div>
                    <div className='togg d-flex flex-column align-items-center'>
                        <h6 className='nm'>Night Mode:</h6>
                        <div className='modeToggler'>
                            <div onClick={() => toggler()} className='toggIconHolder'>
                                <span id='modeIcon' className='fas fa-sun'></span>
                            </div>
                        </div>
                    </div>
                    <h6 className='foote nm'> Mason Keiser  © 2021. All rights reserved.</h6>
                </div>
            </div>
            <Bg/>
        </div>
    )
}

export default My_Profile