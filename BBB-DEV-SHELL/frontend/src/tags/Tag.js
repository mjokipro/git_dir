import React from "react";
import {Link} from 'react-router-dom'

const Tag = ({id, name}) => {

    return (
        <div>
            <Link to={`/tags/${id}`}>
            <p>{name}</p>
            </Link>
        </div>
    )
}

export default Tag