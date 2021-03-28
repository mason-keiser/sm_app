import { useEffect, useState } from "react"
import React from 'react'

const Post_Card = (props) => {

    const tert = (props.post.user_name[0] === '@') ? props.post.user_name : `@${props.post.user_name}`

    return (
        <div>
            <h6 className='nm'>{`${tert}`}</h6>
            <div className='nm'>{props.post.post}</div>
        </div>
    )
}

export default Post_Card