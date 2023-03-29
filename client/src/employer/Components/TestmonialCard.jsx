import React from 'react'

const TestmonialCard = ({ name, review, picture }) => {
    return (
        <div className='testimonialContainer'>
            <div>
                <img className='testimonialImage' src={picture} alt="" />
            </div>
            <h2>{name}</h2>
            <p>{review}</p>
        </div>
    )
}

export default TestmonialCard