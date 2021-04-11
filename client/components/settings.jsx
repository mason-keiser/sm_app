import React from 'react'
import { useEffect, useState } from "react"
import Bg from "./bg"

const Settings = (props) => {
    const [settingsView, setSettingsView] = useState('home');

    const submitBio = () => {
        if (props.bio.length > 50) {
            document.getElementById('req').style.color = 'red'
            document.getElementById('req').innerHTML = 'exceeded character limit'
            return 
        }
        if (!props.bio) {
            return null
        }
        let obj =
        {
            bio: props.bio,
            user_id: props.props.user.user_id
        }

        props.changeBio(obj)
        setSettingsView('home')
    }

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

        if (props.props.nightMode == false) {
            for (let i = 0; i < words.length; i++ ) {
                words[i].style.color = 'black'
                words[i].style.borderColor = 'black'
            }
            for (let j = 0; j < image.length; j++) {
                image[j].style.color = 'black'
                image[j].style.background = 'white'
            }

            if (props.settings == false) {
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
            
          
        } if (props.props.nightMode == true) {
            for (let i = 0; i < words.length; i++ ) {
                words[i].style.color = 'white'
                words[i].style.borderColor = 'white'
            }
            for (let j = 0; j < image.length; j++) {
                image[j].style.color = 'white'
                image[j].style.background = 'black'
            }

            if (props.settings == false) {
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
    }, [props.props.nightMode, settingsView])

    const settingsHandler = (event) => {
        if (event.target.id === 'cph') {
            setSettingsView('cph')
        } if (event.target.id ==='cpi') {
            setSettingsView('cpi')
        } if (event.target.id === 'cb') {
            setSettingsView('cb')
        }
    }

    const view = (settingsView === 'home') 
        ? (
            <div className='settingsCont'>
                <h6 className='nm' id='cph' onClick={(e) => settingsHandler(e)}>Change Profile Header</h6>
                <h6 className='nm' id='cpi' onClick={(e) => settingsHandler(e)}>Change Profile Image</h6>
                <h6 className='nm' id='cb' onClick={(e) => settingsHandler(e)}>Change Bio</h6>
            </div>
        )
            : (settingsView === 'cb')
            ? (
                <div className='settingsCont2'>
                    <div className='backButton' onClick={() => setSettingsView('home')}><span className='fas fa-chevron-left'></span></div>
                    <div className='cbHeader'>
                        <h6 className='nm'>Change Bio</h6>
                    </div>
                    <div className='bioCont'>
                        <input onChange={() => props.setBio(event.target.value)}  type="text" id='bio' placeholder='50 character limit'/>
                        <div id='req'></div>
                        <div className='subBtnCont'>
                            <button onClick={() => submitBio()}>Submit</button>
                        </div>
                    </div>
                </div>
            )
                : (settingsView === 'cpi') 
                    ? (
                        <div className='settingsCont2'>
                            <div className='backButton' onClick={() => setSettingsView('home')}><span className='fas fa-chevron-left'></span></div>
                        </div>
                    ) 
                    : (settingsView === 'cph')
                        ? (
                        <div className='settingsCont2'>
                            <div className='backButton' onClick={() => setSettingsView('home')}><span className='fas fa-chevron-left'></span></div>
                        </div>
                        )
                        : null

    return (
        <div>
           {view}
        </div>
    )
}

export default Settings