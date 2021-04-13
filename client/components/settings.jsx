import React from 'react'
import { useEffect, useState } from "react"
import Bg from "./bg"

const Settings = (props) => {

    const submitBio = () => {
        let obj = {
            img: props.previewSource.previewSource,
            user_id: props.props.user.user_id
        }
        if (!obj) {
            document.getElementById('req').style.color = 'red'
            document.getElementById('req').innerHTML = 'new image added'
            return
        }

        props.changeImg(obj)
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
    }, [props.props.nightMode, props.settingsView, props.modal])

    const settingsHandler = (event) => {
        if (event.target.id === 'cph') {
            props.setSettingsView('cph')
        } if (event.target.id ==='cpi') {
            props.setSettingsView('cpi')
        } if (event.target.id === 'cb') {
            props.setSettingsView('cb')
        }
    }

    const handleFile = (event) => {
        let reader = new FileReader(event);
        reader.onload = () => {
            if (reader.readyState === 2) {
                props.setPreviewSource({
                    previewSource: reader.result
                }) 
                props.setNewProfImg({
                    img: reader.result,
                    user_id: props.props.user.user_id
                })
            }
        }
        reader.readAsDataURL(event.target.files[0])
        setTimeout(() => {
            props.setModal(true)
        },1000) 
    }

    const view = (props.settingsView === 'home') 
        ? (
            <div className='settingsCont'>
                <h6 className='nm' id='cph' onClick={(e) => settingsHandler(e)}>Change Profile Header</h6>
                <h6 className='nm' id='cpi' onClick={(e) => settingsHandler(e)}>Change Profile Image</h6>
                <h6 className='nm' id='cb' onClick={(e) => settingsHandler(e)}>Change Bio</h6>
            </div>
        )
            : (props.settingsView === 'cb')
            ? (
                <div className='settingsCont2'>
                    <div className='backButton' onClick={() => props.setSettingsView('home')}><span className='fas fa-chevron-left'></span></div>
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
                : (props.settingsView === 'cpi') 
                    ? (
                        <div className='settingsCont2'>
                            {props.modalTerp}
                            <div className='backButton' onClick={() => props.setSettingsView('home')}><span className='fas fa-chevron-left'></span></div>
                            <div className='cbHeader'>
                                <h6 className='nm'>Change Profile Image</h6>
                            </div>
                            <form action="">
                                <div className='cpiCont'>
                                    <input type="file" placeholder='Type Here' name='img' accept='images/*;capture=camera' className="" id='prof_img' onChange={handleFile}/>
                                    <div className="label mb-3" >
                                        <label htmlFor="prof_img" className="image_upload">Add Image</label>
                                        <div id='req'></div>
                                    </div>
                                    <div className="previewImg" id='label'>
                                        {props.previewSource !== null ? (
                                            <img src={props.previewSource.previewSource} id='label' alt="chosen"/>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) 
                    : (props.settingsView === 'cph')
                        ? (
                        <div className='settingsCont2'>
                            <div className='backButton' onClick={() => props.setSettingsView('home')}><span className='fas fa-chevron-left'></span></div>
                            <div className='cbHeader'>
                                <h6 className='nm'>Change Profile Header</h6>
                            </div>
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