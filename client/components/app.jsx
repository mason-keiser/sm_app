import { useEffect, useState } from "react"
import React from 'react'
import Particles from 'react-tsparticles'
import Landing from "./landing"


const App = (props) => {

    const [view, setView] = useState({ name: 'init', params: {} })

    return (
        <div>
            <Landing/>
        </div>
    )
}

export default App
