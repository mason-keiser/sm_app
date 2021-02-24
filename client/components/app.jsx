import { useEffect, useState } from "react"
import React from 'react'
import Particles from 'react-tsparticles'
import Landing from "./landing"
import Login from "./login"
import Signup from './signup'


const App = (props) => {

    const [view, setView] = useState({ name: 'init', params: {} })
    const [user, setUser] = useState({})

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
                    }
                })
    }

    const loginAsGuest = () => {
        fetch('/api/login/@guest/guest', {
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
                : null
    return (
        <div>
            {navTert}
        </div>
    )
}

export default App
