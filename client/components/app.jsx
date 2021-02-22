import { useEffect, useState } from "react"
import React from 'react'
import Particles from 'react-tsparticles'
import Landing from "./landing"
import Login from "./login"


const App = (props) => {

    const [view, setView] = useState({ name: 'init', params: {} })

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
        ? <Landing setView={setView} dateBuilder={dateBuilder} formatAMPM={formatAMPM}/>
        : (view.name === 'login')
            ? <Login setView={setView} dateBuilder={dateBuilder} formatAMPM={formatAMPM}/>
            : null

    return (
        <div>
            {navTert}
        </div>
    )
}

export default App
