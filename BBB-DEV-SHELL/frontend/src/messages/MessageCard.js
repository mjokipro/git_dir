import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const MessageCard = ({id, from_user, to_user, body}) => {

    return (       
      <Link to={`/messages/${id}`}>
        <div className='card mt-1'>
          <h5>Message From User:</h5>
          <p className='lead'>{from_user}</p>
          <h5>Message To User:</h5>
          <p className='lead'>{to_user}</p>
          <h5>Body of Message:</h5>
          <p className='lead'>{body}</p>
        </div>
      </Link>
    )
}

export default MessageCard