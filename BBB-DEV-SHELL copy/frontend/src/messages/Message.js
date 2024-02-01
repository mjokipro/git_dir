import React from "react";
import {Link} from 'react-router-dom'

const Message = ({id, to_user, from_user, body}) => {

    return (
        
            <Link to={`/messages/${id}`}>
            <p>{to_user}</p>
            <p>{from_user}</p>
            <p>{body}</p>
            </Link>
        
    )
}

export default Message