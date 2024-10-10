import React from 'react'
import Person from './Person'
import styled from 'styled-components'
import UIPlayground from './UIPlayground'

const Header = styled.h1`
    color: purple;
    background-color: green;
    font-size: ${props => props.isSuperBig ? '100px' : '50px'};
`

const ResponsiveHeader = styled(Header)`
    font-size: 10vw;
`

const HoverMe = styled.button`
    padding: 2 rem;
    background-color: pink;
    &:hover{
        background-color: ${props => props.hoverColor};
    }
`

const App = () => {

    return (
        <main>
            <UIPlayground/>
            <Header isSuperBig>Hello</Header>
            <Header >Hello</Header>
            <ResponsiveHeader>I am responsive</ResponsiveHeader>
            <HoverMe hoverColor='yellow'>Hover</HoverMe>
            <HoverMe hoverColor='blue'>Hover</HoverMe>
            <Person name="cuh" />
        </main>
    )
}

export default App