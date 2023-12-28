import { useState } from "react"

it('should start showing', () => {
    const {getByText} = render(<Toggler />)
    getByText("Hello World")
})