import React from 'react'
import { useEffect, useState } from "react"
import Bg from "./bg"
import My_Post_Card from "./my_post_card"
import {
    Link,
    animateScroll as scroll
  } from 'react-scroll';
import Settings from './settings'

const My_Profile = (props) => {
    const [settings, setSettings] = useState(false);
    const [bio, setBio] = useState()

    useEffect(() => {
        const iconHolder = document.querySelector('.toggIconHolder')
        const icon = document.getElementById('modeIcon');
        const bar = document.querySelector('.modeToggler')
        const bg = document.getElementById('tsparticles')
        const words = document.querySelectorAll('.nm')                
        const userI = document.getElementById('userI')
        const menu = document.getElementById('menu')
        const image = document.querySelectorAll('.profileImageCont')
        const headerbg = document.querySelector('#headerbg')
        const men1 = document.getElementById('p')
        const men2 = document.getElementById('s')
        men1.style.color = '#24B67E'

        if (props.nightMode == false) {
            for (let i = 0; i < words.length; i++ ) {
                words[i].style.color = 'black'
                words[i].style.borderColor = 'black'
            }
            for (let j = 0; j < image.length; j++) {
                image[j].style.color = 'black'
                image[j].style.background = 'white'
            }

            if (settings == false) {
                men1.style.color = '#24B67E'
            } else {
                men2.style.color = '#24B67E'
            }

            headerbg.style.background='black'
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

            if (settings == false) {
                men1.style.color = '#24B67E'
            } else {
                men2.style.color = '#24B67E'
            }
    
            headerbg.style.background='white'
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
    },[props.nightMode, settings, bio])

    const changeBio = (bioInfo) => {
        let sendBio = bio.replace(/"([^"]+(?="))"/g, '$1')
        fetch('/api/changeBio', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(bioInfo)
        })
        .then(response => {
            if (response.status === 400 || response.status === 404) {
                return null
            } else {
                return response.json();
            }
        })
            .then(result => {
                if (!result) {
                    return null
                } else {
                    props.setUser(result[0])
                    setBio('')
                }
            }) 
    }

    const toggler = () => {
        if (props.nightMode == false) {
            props.setNightMode(true)
        } if (props.nightMode == true)  {
            props.setNightMode(false)
        }
    }

    const menuTogg = (event) => {
        const men1 = document.getElementById('p')
        const men2 = document.getElementById('s')
        men1.style.color = '#24B67E'

        if (event.target.id === men1.id) {
            men1.style.color = '#24B67E'
            setSettings(false)
            if (props.nightMode == true) {
                men2.style.color='white'
            } else {
                men2.style.color='black'
            }
        } if (event.target.id === men2.id) {
            men2.style.color = '#24B67E'
            setSettings(true)
            if (props.nightMode == true) {
                men1.style.color='white'
            } else {
                men1.style.color='black'
            }
        }
    }

    const headerImg = (!props.user.user_profile_header) 
        ? (
            <div className='headEr'>
                <div style={{background: 'black', }} alt="header" id='headerbg'></div>
            </div>
        ) 
        : null

    const profImg = (!props.user.user_profile_header) 
    ? (
        <div className='imageCo2 mt-3'>
            <div className='profileImageCont profileImageCont2 p-2'>
                <div className='nm fas fa-user' id='userIm'></div>
            </div>
        </div>
    ) 
    : null

    const items = (props.posts !== null && props.posts !== undefined) 
    ?  (props.posts.map((post, index) => {
            return(
                <div className='singPost m-auto' key={index}>
                    <My_Post_Card
                    viewIndPost={props.viewIndPost}
                    postId={props.postId}
                    setView={props.setView}
                    setPostId={props.setPostId}
                    likePost={props.likePost}
                    user={props.user}
                    post={post}
                    key={post.post_id}
                    />
                </div>
            );
        })
    )
    : <h2 className="empty mt-5 m-auto">No Posts available</h2>

    const profTerp = (settings) 
        ? (
            <Settings changeBio={changeBio} bio={bio} setBio={setBio} props={props} settings={settings}/>
        ) 
        : (
            <div>
                {items}
                <div className='toTop' onClick={() => scroll.scrollToTop()}>
                    <div className='fas fa-chevron-up' style={{color: 'white'}}></div>    
                </div>
            </div>
        )

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
                    <h3 onClick={() => props.setView({name: 'feed', params: {}})} className='menTit mt-3 nm'>üConnect</h3>
                    <div className='profileTag mb-3' onClick={() => props.setView({name: 'feed', params: {}})} style={{height: '7vh'}}>
                        <div id='userI' className='nm fas fa-home'></div>
                        <h5 className='nm ho'>Feed</h5>
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
            <div className='profCont'>
                <div className='headerCont'>
                    {headerImg}
                    {profImg}
                </div>
                <div>
                    <h4 id='useName' className='nm'>@{props.user.user_name}</h4>
                    <h6 id='useName2' className='nm bio' style={{paddingLeft: 0 ,textAlign: 'center'}}>{props.user.user_bio}</h6>
                </div>
                <div className='switchCont'>
                    <h5 id='p' onClick={menuTogg} className='nm h ho'>My Posts</h5>
                    <h5 id='s' onClick={menuTogg}className='nm h ho'>Settings</h5>
                </div>
                {profTerp}
            </div>
            <Bg/>
        </div>
    )
}

export default My_Profile