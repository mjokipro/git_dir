import React from "react";
import {render} from "@testing-library/react"
import Routes404 from "./Routes404"
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import {UserProvider} from './testUtils'

it("renders without crashing", () => {
    render(
        <MemoryRouter>
            <UserProvider>
                <Routes404 />
            </UserProvider>
        </MemoryRouter>
    )
})

it("matches snapshot", () => {
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Routes404 />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})