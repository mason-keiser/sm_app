import { useEffect, useState } from "react"
import React from 'react'

const Post_Card = (props) => {

    const profImage = (props.post.user_profile_image === null) 
        ? (
            <div className='imageCo mt-3'>
                <div className='profileImageCont p-2'>
                    <div className='nm fas fa-user'></div>
                </div>
            </div>
        ) : null

    const replies = (props.post.replies == null ) ? 0 : props.post.replies.length  

    const handleLike = (event) => {
        props.setPostId(event.target.id)

        const obj = {
            post_id: event.target.id
        }
        if (!obj) return null

        props.likePost(obj)
    }

    return (
        <div>
            <div className='d-flex flex-row p-2 yo co'>
                {profImage}
                <div className='nice co d-flex flex-column justify-content-between p-2'>
                    <h6 className='sm l nm mt-3'>{`@${props.post.user_name}`}</h6>
                    <div style={{cursor: 'pointer'}} className='sm l nm' onClick={() =>  props.setView({name: 'indPost', params: {post_id: props.viewIndPost(props.post.post_id)}})}>{props.post.post}</div>
                    <div className='d-flex flex-row justify-content-center' >
                        <div className='sm nm fas fa-star m-3 sm'id={props.post.post_id} onClick={handleLike}><span className='sm nm m-2'>{props.post.likes}</span></div>
                        <div className='sm nm fas fa-comments m-3'><span className='nm m-2'>{replies}</span></div>
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default Post_Card