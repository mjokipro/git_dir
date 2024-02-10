import React from 'react'
import {Link} from 'react-router-dom'
// import { useState, useEffect } from 'react';
// import entries from "../sample.json"
// import MovieCard from './MovieCard'
// import { v4 as uuidv4 } from 'uuid';
// import ImageCard from '../ImageCard'
// import Movie from './Movie'
import './MovieList.css'
import { useParams } from 'react-router-dom'

const MovieCard = ({title, description, programType, url, width, height}) => {
    console.debug("moviecard", title, description)
    // const [list, setList] = useState(null)
    // const {title} = useParams()
    // console.debug("Movies=", movies)
// if(!props) return <p>Loading...</p>

    return (
     
            <Link to={`/movies/${title}`} className='MovieList'>
                <img src={`${url}`} width={`${width}px`} height={`${height}px`} />
            </Link>
    

      
    )
}

export default MovieCard;