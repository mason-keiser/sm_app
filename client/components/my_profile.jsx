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
    const [newProfImg, setNewProfImg] = useState();
    const [newHeaderImg, setNewHeaderImg] = useState();
    const [modal, setModal] = useState(false)
    const [settingsView, setSettingsView] = useState('home');
    const [previewSource, setPreviewSource] = useState(null)

    const yes = () => {
        if (settingsView === 'cpi') {
            changeImg(newProfImg)
            setNewProfImg(null)
            setSettingsView('home')
        } if (settingsView === 'cph') {
            changeHeaderImg(newHeaderImg)
            setNewHeaderImg(null)
            setSettingsView('home')
        }
    }

    const no = () => {
        setNewProfImg(null)
        setPreviewSource(null)
        setModal(false)
    }

    let modalTitle = (settingsView === 'cph') ? 'Header' : 'Profile'
    const modalTerp = (modal == true) ? (
        <div className='modalCont'>
            <h5 className='nm' style={{textAlign: 'center'}}>Confirm {modalTitle} Image</h5>
            <div id='yn' className='d-flex flex-row align-items-center justify-content-around'>
                <h6 className='nm' onClick={() => yes()}>yes</h6>
                <h6 className='nm' onClick={() => no()}>no</h6>
            </div>
        </div>
    ) : null

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
        const mod = document.querySelector('.modalCont')
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

            if (mod) {
            mod.style.background = 'white'
            }
            headerbg.style.background='black'
            userI.style.color = 'black'
            iconHolder.style.float = 'right'
            iconHolder.classList.remove('d')
            icon.classList.remove('fa-moon')
            icon.style.color = 'orange'
            icon.classList.add('fa-sun')
            iconHolder.style.background = '#F5F5F5'
            iconHolder.style.border = ' 1px solid white'
            iconHolder.style.boxShadow = '0 4px 2px -2px rgba(0, 0, 0, 0.2)'
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
            if (mod) {
                mod.style.background = 'black'
                mod.style.border = '1px solid white'
            }
            headerbg.style.background='white'
            userI.style.color = 'white'
            iconHolder.style.float = 'left'
            iconHolder.classList.add('d')
            icon.style.color = 'yellow'
            icon.classList.remove('fa-sun')
            icon.classList.add('fa-moon')
            iconHolder.style.background = '#262626'
            iconHolder.style.border = ' 1px solid black'
            bar.style.background = 'black'
            bg.firstChild.style.backgroundColor='#262626'
            menu.style.background ='#262626'
        }
    },[props.user, props.nightMode, settings, bio, modal, props.usersPosts, previewSource, props.user.user_header_image])

    const changeBio = (bioInfo) => {
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
                    setSettingsView('home')
                }
            }) 
    }

    const changeImg = (imgInfo) => {
        fetch('/api/changeProfileImg', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(imgInfo)
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
                }
            }) 
    }

    const changeHeaderImg = (imgInfo) => {
        fetch('/api/changeHeaderImg', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(imgInfo)
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

    const headerImg = (!props.user.user_header_image) 
        ? (
            <div className='headEr'>
                <div style={{background: 'black', }} alt="header" id='headerbg'></div>
            </div>
        ) 
        : (
            <div className='headEr'>
                <div alt="header" id='headerbg'>
                    <img src={props.user.user_header_image} alt="" id='headerbg'/>
                </div>
            </div>
        )

    const profImg = (!props.user.user_profile_image) 
    ? (
        <div className='imageCo2 mt-3'>
            <div className='profileImageCont profileImageCont2 p-2'>
                <div className='nm fas fa-user' id='userIm'></div>
            </div>
        </div>
    ) 
    : (
        <div className='imageCo2'>
            <div className='profileImageCont profileImageCont2'>
                <img src={props.user.user_profile_image} alt=""id='upi'/>
            </div>
        </div>
    )

    const items = (props.usersPosts !== null && props.usersPosts !== undefined) 
    ?  (props.usersPosts.map((post, index) => {
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
            <Settings setNewHeaderImg={setNewHeaderImg} previewSource={previewSource} setPreviewSource={setPreviewSource} settingsView={settingsView} setSettingsView={setSettingsView} setModal={setModal} modalTerp={modalTerp} setNewProfImg={setNewProfImg} newProfImg={newProfImg} changeImg={changeImg} changeBio={changeBio} bio={bio} setBio={setBio} props={props} settings={settings}/>
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