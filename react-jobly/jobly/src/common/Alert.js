import React from 'react'
// import {useHistory} from 'react-router-dom'


const Alert = ({type="danger", messages=[]}) => {
    console.debug("Alert", "type=", type, "msg=", messages)
   
    return (
        <div role="alert">
            {messages.map(error => (
                <p key={error}>
                    {error}
                </p>
            ))}
            <p>Alert</p>
        </div>
    )
}

export default Alert