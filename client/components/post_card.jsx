import { useEffect, useState } from "react"
import React from 'react'

const Post_Card = (props) => {

    return (
        <div>
            <div className='nm'>{props.post.post}</div>
        </div>
    )
}

export default Post_Card