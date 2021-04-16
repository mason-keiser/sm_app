import { useEffect, useState } from "react"
import React from 'react'
import Bg from "./bg"
import Post_Card from "./post_card"
import {
    Link,
    animateScroll as scroll
  } from 'react-scroll';

const Feed = (props) => {
    const [newPost, setNewPost] = useState();

    useEffect(() => {
        props.getPosts()
    }, []) 

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
        },[props.nightMode, props.posts])

    const toggler = () => {
        if (props.nightMode == false) {
            props.setNightMode(true)
        } if (props.nightMode == true)  {
            props.setNightMode(false)
        }
    }

    const handleChange = (event) => {
        setNewPost(event.target.value)
    }

    const submitPost = () => {
        const input = document.getElementById('postInput')
        if (!newPost) {
            console.log('falsy post')
            return null
        }
        props.postToFeed({
            user_id: props.user.user_id,
            post: newPost,
            likes: 0,
        })
        input.value = ''
        setNewPost('')
    }

    const items = (props.posts !== null && props.posts !== undefined) 
    ?  (props.posts.map((post, index) => {
            return(
                <div className='singPost m-auto' key={index}>
                    <Post_Card
                    viewIndPost={props.viewIndPost}
                    postId={props.postId}
                    setView={props.setView}
                    setPostId={props.setPostId}
                    likePost={props.likePost}
                    post={post}
                    key={post.post_id}
                    />
                </div>
            );
        })
    )
    : <h2 className="empty mt-5 m-auto">No Posts available</h2>

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
                        <h5 onClick={() => props.setView({name: 'myProfile', params: {}})} className='nm ho'>My Profile</h5>
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
                <div className='postCont'>
                    <div className='inputCont'>
                        <textarea style={{resize: 'none'}} placeholder='enter post here ..' name="postInput" id="postInput" cols="30" rows="10" onChange={handleChange}></textarea>
                        <button onClick={() => submitPost()}>+</button>
                    </div>
                    <div id='feedCont' className='row-cols-lg-2'>
                        {items}
                    </div>
                    <div className='toTop' onClick={() => scroll.scrollToTop()}>
                        <div className='fas fa-chevron-up' style={{color: 'white'}}></div>    
                    </div> 
                </div>
            </div>
            <Bg/>
        </div>
    )
}

export default Feed