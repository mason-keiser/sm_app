import { useEffect, useState } from "react"
import React from 'react'

const Post_Card = (props) => {

    return (
        <div>
            <h6 className='nm'>{`@${props.post.user_name}`}</h6>
            <div className='nm'>{props.post.post}</div>
        </div>
    )
}

export default Post_Card