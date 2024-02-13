import React from 'react'

const Pizza = ({type, description, price}) => {

    return (
        <div className='container'>
            <h3>{type}</h3>
            <p>{description}</p>
            <p>{price}</p>
        </div>
    )
}

export default Pizza