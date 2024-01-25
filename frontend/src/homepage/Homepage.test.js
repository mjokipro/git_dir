import React from "react";
import {render} from "@testing-library/react"
import Homepage from "./Homepage"
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import {UserProvider} from "../testUtils"

it("matches snapshot", () => {
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider>
                <Homepage />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})
it("matches snapshot when logged out", () => {
    const {asFragment} = render (
        <MemoryRouter>
            <UserProvider currentUser={null}>
                <Homepage />
            </UserProvider>
        </MemoryRouter>
    )
    expect(asFragment()).toMatchSnapshot()
})

