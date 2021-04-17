import { useEffect, useState } from "react"
import React from 'react'

const My_Post_Card = (props) => {
    const [r, setR] = useState()

    const getReps = () => {
        fetch('/api/replyz/' + props.post.post_id, {
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
                    setR(result)
                }
            }) 
    }

    useEffect(() => {
        getReps()
    }, [])

    const profImage = (!props.user.user_profile_image) 
        ? (
            <div className='imageCo mt-3'>
                <div className='profileImageCont p-2'>
                    <div className='nm fas fa-user'></div>
                </div>
            </div>
        ) : (
            <div className='imageCo mt-3'>
                <div className='profileImageCont'>
                    <img src={props.user.user_profile_image} style={{objectFit: 'cover'}}/>
                </div>
            </div>
        )
    
    const replies = (!r ) ? 0 : r.length  

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
                    <h6 className='sm l nm mt-3'>{`@${props.user.user_name}`}</h6>
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

export default My_Post_Card