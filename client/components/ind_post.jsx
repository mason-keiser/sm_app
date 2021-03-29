import React from 'react'
import { useEffect, useState } from "react"
import Bg from "./bg"

const Ind_Post = (props) => {

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

    const toggler = () => {
        if (props.nightMode == false) {
            props.setNightMode(true)
        } if (props.nightMode == true)  {
            props.setNightMode(false)
        }
    }

    const handleLike = (event) => {
        props.setPostId(event.target.id)

        const obj = {
            post_id: event.target.id
        }
        if (!obj) return null

        props.likePost(obj)
        props.viewIndPost(event.target.id)
    }

    const replies = (props.indPost !== null) ? 0 : props.indPost.replies

    const profImage = (props.indPost !== null) 
    ? (
        <div className='imageCo mt-3'>
            <div className='profileImageCont p-2'>
                <div className='nm fas fa-user'></div>
            </div>
        </div>
    ) : null

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
                    <h3 style={{cursor: 'pointer'}} className='menTit mt-3 nm' onClick={() => props.setView({name: 'feed', params: {}})}>üConnect</h3>
                    <div className='profileTag'>
                        <div id='userI' className='fas fa-user'></div>
                        <h4 className='nm'>My Profile</h4>
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
            {
            (props.indPost == undefined) ? null : 
              <div className='indCont'>
              <div className='d-flex flex-row p-2 co mt-5 m-auto'>
                {profImage}
                  <div className='co d-flex flex-column justify-content-between p-2' style={{height: '20vh', textAlign: 'center'}}>
                      <h6 className='l nm mt-3' id='indUser'>{`@${props.indPost.user_name}`}</h6>
                      <div className='nm l' id='indPost'>{props.indPost.post}</div>
                      <div className='d-flex flex-row justify-content-center' >
                          <div className='nm fas fa-star m-3 indlikes' id={props.indPost.post_id} onClick={handleLike}><span className='nm m-2' id='indLikes'>{props.indPost.likes}</span></div>
                          <div className='nm fas fa-comments m-3'><span className='nm m-2'>{replies}</span></div>
                      </div>
                  </div>
  
              </div>
              </div>
              }
            <Bg/>
        </div>
    )
}

export default Ind_Post
