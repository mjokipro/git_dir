import React, { useCallback, useEffect, useState } from "react";
// import { v4 as uuidv4 } from 'uuid';
// import MovieContext from "./MovieContext";
import { useParams } from "react-router-dom"
import {entries} from '../sample.json'


const MovieDetail = ({description, programType}) => {

    const [entry, setEntry] = useState(entries)
    console.debug("Entry", entry)
    console.debug("Entries", entries)

    // const {description, programType, images} = entries


    const title = useParams()
    console.debug("Title", title)
    // const movies  = useContext(MovieContext)
    // console.debug("Movies=", movies)

    useEffect(
        () => {
            const entry = entries[title] === title ? entries[title] : title
            setEntry(entry)
            console.debug("Entry=", entry)
        }, [title]
    )

    useCallback(
        () => {
            const arr = entries.map(v => v).filter(v => v.title === title)
            setEntry(arr)
            console.debug("Arr=", arr)
        }, [title]
    )

    return (
        <div>
            
            <p>{entry.title}</p>
            <p>{entry.description}</p>
            <p>{description}</p>
            <p>{entry.programType}</p>
        </div>
    )
}

export default MovieDetail;