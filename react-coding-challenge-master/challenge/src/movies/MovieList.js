import React from 'react'
import { useState, useEffect } from 'react';
import {entries} from "../sample.json"
import MovieCard from './MovieCard'

const MovieList = ({type}) => {

    const [movies, setMovies] = useState([])
    console.debug("Movies=", movies)
    console.debug("Entries=", entries)
    console.debug("Type=", type)

    useEffect(
        () => {
            const movies = entries.filter(v => v.programType !== type)
            setMovies(movies)
        }, [type]
    )

    return (
        <>

{movies.length
            ? (
                <div >
                  {movies.map(m => (
                 
                      <MovieCard
                          title={m.title}
                          description={m.description}
                          programType={m.programType}
                          url={m.images.url}
                          width={m.images.width}
                          height={m.images.height}
                      />
                     
                  ))}
                </div>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
            <MovieCard 
            />
        </>
    )
}

export default MovieList;