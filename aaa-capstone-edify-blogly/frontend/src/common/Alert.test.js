import React from "react";
import {render} from "@testing-library/react"
import Alert from './Alert'

it("renders without crashing", function(){
    render(<Alert />)
})

it("matches snapshot for danger", () => {
    let msg = ["test message"]
    const {asFragment} = render(<Alert type="success" messages={msg}/>)
    expect(asFragment()).toMatchSnapshot()
})