import React from 'react'
import {Link} from 'react-router-dom'
import './MovieList.css'

const MovieCard = ({title, description, programType, url, width, height}) => {
    console.debug("moviecard", title, description)

    return (
            <Link to={`/movies/${title}`} className='MovieList'
            >
                <img alt={description} src={`${url}`} width={`${width}px`} height={`${height}px`}
                title={title} description={description} programType={programType}
                 />
            </Link>
    )
}

export default MovieCard;