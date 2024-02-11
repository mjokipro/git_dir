import React from "react";
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Button2 = styled.button`
  font-size: 3em;
  border-radius: 10px;
  color: pink;
  border: 2px solid lightblue;
  background-color: black;
  height: 400px;
  width: 200px;
  
`

const Home = () => {

    return (
        <>
            <Link to={`/series`} type="series">
                <Button2>Series</Button2>
            </Link>
            <Link to={`/movies`} type="movie">
                <Button2>Movies</Button2>
            </Link>
        </>
    )
}

export default Home