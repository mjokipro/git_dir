import React from 'react'
import {Link} from 'react-router-dom'

const MessageCard = ({id, from_user, to_user, body}) => {
    console.debug("message card", from_user)

    return (
        
            <Link to={`/messages/${id}`}>
                <div className='CompanyCard card'>
                    <div className='card-body'>
                    <h4>{from_user}</h4>
                        <h4>{to_user}</h4>
                        {/* {logoUrl && <img src={logoUrl} alt={name} />} */}
                    
                    <p>{body}</p>
                    {/* <p><small>{sent_at}</small></p>
                    { read_at && <p><small>{read_at}</small></p> } */}
                    </div>
                </div>
            </Link>
        
    )
}

export default MessageCard