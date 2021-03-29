import { useEffect, useState } from "react"
import React from 'react'
import Landing from "./landing"
import Login from "./login"
import Signup from './signup'
import Feed from './feed'
import Ind_Post from "./ind_post"

const App = () => {

    const [view, setView] = useState({ name: 'init', params: {} })
    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [postId, setPostId] = useState('postId')
    const [nightMode, setNightMode] = useState(false)
    const [indPost, setIndPost] = useState()

    const viewIndPost = (postId) => {
        fetch('/api/singPost/' + postId,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
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
                    setIndPost(result[0])
                }
            }) 
    }

    const likePost = (postId) => {
        console.log(postId)
        fetch('/api/like' , {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postId)
        })
         .then(response => {
            if (response.status === 400 || response.status === 404) {
                return null
            } else {
                const stars = document.querySelectorAll('.fa-star')

                for (let i = 0; i < stars.length; i++) {
                    if (postId.post_id === stars[i].id) {
                        stars[i].style.color = 'yellow'
                    }
                    setTimeout(() => {
                        if (nightMode == false) {
                            stars[i].style.color = 'black'
                        } else {
                            stars[i].style.color = 'white'
                        }
                    },400) 
                }
                setPostId()
                return response.json();
            }
        })
            .then(result => {
                if (!result) {
                    return null
                } else {
                    getPosts()
                }
            })
    }

    const getPosts = () => {
        fetch('/api/getPosts', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
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
                    result.sort((a, b) => (a.post_id > b.post_id) ? 1 : -1)
                    setPosts(result.reverse())
                }
            })
    }

    const postToFeed = (postInfo) => {
        fetch('api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(postInfo)
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
                    setPosts(result)
                    getPosts()
                }
            })
    }

    const login = (loginInfo) => {
        if (!loginInfo) {
            return null
        }
        const name = loginInfo.user_name;
        const password = loginInfo.user_password;
        fetch('/api/login/' + name + '/' + password, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
        })
            .then(response => {
                if (response.status === 400 || response.status === 404) {
                    const use = document.getElementById('use');
                    const lock = document.getElementById('lo')
                    const req = document.getElementById('required')
                        use.style.color = 'red';
                        lock.style.color = 'red';
                        req.textContent = '* login information entered incorrectly *'
                } else {
                    return response.json();
                }
            })
                .then(result => {
                    if (!result) {
                        return null
                    } else {
                        setUser({
                            user_id: result[0].user_id,
                            user_name: result[0].user_name,
                            user_profile_image: result[0].user_profile_image ? result[0].user_profile_image : null,
                            user_header_image: result[0].user_header_image ? result[0].user_header_image : null
                        })
                        setView ({ name: 'feed', params: {}})
                    }
                })
    }

    const loginAsGuest = () => {
        fetch('/api/login/guest/guest', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'}
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
                        setUser({
                            user_id: result[0].user_id,
                            user_name: result[0].user_name,
                            user_profile_image: result[0].user_profile_image ? result[0].user_profile_image : null,
                            user_profile_header: result[0].user_profile_header ? result[0].user_header_image : null
                        })
                        setView ({ name: 'feed', params: {}})
                    }
                })
    }

    const signUp = (signupInfo) => {
        console.log(signupInfo)
        fetch('/api/signUp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(signupInfo)
        })
        .then(response => {
            if (response.status === 400 || response.status === 404) {
                const use  = document.getElementById('use');
                const pass1 = document.getElementById('lo');
                const pass2 = document.getElementById('lo2')
                const req = document.getElementById('required')
                    use.style.color = 'red';
                    pass1.style.color = 'red';
                    pass2.style.color = 'red';
                    req.textContent = '* information entered incorrectly *'
            } else {
                return response.json();
            }
        })
            .then(result => {
                if (!result) {
                    return null
                } else {
                    setUser({
                        user_id: result.user_id,
                        user_name: result.user_name,
                        user_profile_image: result.user_profile_image ? result.user_profile_image : null,
                        user_profile_header: result.user_profile_header ? result.user_header_image : null
                    })
                    setView ({ name: 'feed', params: {}})
                }
            })
    }

    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
        return `${month} ${date}, ${year}`
    }

    const formatAMPM = (d) => {
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    let navTert = (view.name === 'init')
        ? <Landing loginAsGuest={loginAsGuest} setView={setView} dateBuilder={dateBuilder} formatAMPM={formatAMPM}/>
        : (view.name === 'login')
            ? <Login login={login} loginAsGuest={loginAsGuest} setView={setView} dateBuilder={dateBuilder} formatAMPM={formatAMPM}/>
            : (view.name === 'signup')
                ? <Signup signup={signUp} loginAsGuest={loginAsGuest} setView={setView} dateBuilder={dateBuilder} formatAMPM={formatAMPM}/>
                : (view.name === 'feed')
                    ?<Feed setPostId={setPostId} viewIndPost={viewIndPost} nightMode={nightMode} setNightMode={setNightMode} likePost={likePost} postToFeed={postToFeed} getPosts={getPosts} setPosts={setPosts} posts={posts} user={user} setView={setView} dateBuilder={dateBuilder} formatAMPM={formatAMPM}/>
                    : (view.name === 'indPost')
                        ? <Ind_Post setPostId={setPostId} viewIndPost={viewIndPost} indPost={indPost} setIndPost={setIndPost} nightMode={nightMode} setNightMode={setNightMode} likePost={likePost} postToFeed={postToFeed} getPosts={getPosts} setPosts={setPosts} posts={posts} user={user} setView={setView} view={view} dateBuilder={dateBuilder} formatAMPM={formatAMPM}/>
                        : null
    return (
        <div>
            {navTert}
        </div>
    )
}

export default App
