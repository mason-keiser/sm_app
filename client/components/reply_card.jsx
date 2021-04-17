import React from 'react';

const Reply_Card = (props) => {

    const profImage = (props.reply.user_profile_image === null) 
        ? (
            <div className='imageCo mt-3'>
                <div className='profileImageCont p-2'>
                    <div className='nm fas fa-user'></div>
                </div>
            </div>
        ) : (
            <div className='imageCo mt-3'>
                <div className='profileImageCont'>
                    <img src={props.reply.user_profile_image} style={{objectFit: 'cover'}}/>
                </div>
            </div>
        )

    return (
        <div className='box'>
            <div className='d-flex flex-row p-2 yo co'>
                {profImage}
                <div className='nice co d-flex flex-column justify-content-evenly p-2'>
                    <h6 className='sm l nm mt-3'>{`${props.reply.user_name}`}</h6>
                    <div style={{cursor: 'pointer'}} className='sm l nm mt-3 ml-2'>{props.reply.reply}</div>
                </div>
            </div>
        </div>
    )
}

export default Reply_Card