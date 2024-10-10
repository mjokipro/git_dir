import React from "react";

const Message = ({id, to_user, from_user, body}) => {

    return (
        <div className="form-group" >
         
            <h3>To User:</h3>
            <p>{to_user}</p>
            <h3>From User:</h3>
            <p>{from_user}</p>
            <h3>Body:</h3>
            <p>{body}</p>
          
        </div>
    )
}

export default Message