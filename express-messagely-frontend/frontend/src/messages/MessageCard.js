import React from 'react'
import {Link} from 'react-router-dom'

const MessageCard = ({from_username, to_username, body, sent_at, read_at}) => {
    console.debug("message card", from_username)

    return (
        
            <Link to={`/messages/${id}`}>
                <div className='CompanyCard card'>
                    <div className='card-body'>
                    <h4>
                        {from_username}
                        {to_username}
                        {/* {logoUrl && <img src={logoUrl} alt={name} />} */}
                    </h4>
                    <p>{body}</p>
                    <p><small>{sent_at}</small></p>
                    { read_at && <p><small>{read_at}</small></p> }
                    </div>
                </div>
            </Link>
        
    )
}

export default MessageCard