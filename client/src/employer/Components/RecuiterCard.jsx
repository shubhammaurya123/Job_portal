import React from 'react'

const RecuiterCard = ({ logo, name, hired }) => {
    return (
        <div className='recuiters'>
            <img className='companyImg' src={logo} alt="" />
            <h3>Company : {name}</h3>
            <h1>Hired : {hired}</h1>
        </div>
    )
}

export default RecuiterCard