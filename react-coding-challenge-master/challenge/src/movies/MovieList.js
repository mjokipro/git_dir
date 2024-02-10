import React from 'react'
import { useState, useEffect } from 'react';
import {entries} from "../sample.json"
import MovieCard from './MovieCard'
// import { v4 as uuidv4 } from 'uuid';
import ImageCard from '../ImageCard';
import styled from 'styled-components';


// const Img = styled.img`
// src=
// `

const MovieList = () => {

    const [movies, setMovies] = useState([])
    console.debug("Movies=", movies)
    console.debug("Entries=", entries)

    useEffect(
        () => {
        setMovies(entries)
        }, []
    )

    return (
        <>

{movies.length
            ? (
                < >
                  {movies.map(m => (
                      <MovieCard
                        //   key={c.handle}
                          title={m.title}
                          description={m.description}
                          programType={m.programType}
                          url={m.images.url}
                          width={m.images.width}
                          height={m.images.height}
                      />
                  ))}
                </>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
            <MovieCard 
            
            />

        </>
    )
}

export default MovieList;