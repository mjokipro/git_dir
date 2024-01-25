import React from "react";
import { render } from "@testing-library/react";
import Dog from "./Dog";

it('should render', () => {
  render(<Dog name="yodog" isAdopted={true} />)
})

it('should match snapshot', () => {
  const {asFragment} =  render(<Dog name="yodog" isAdopted={true} />)
  expect(asFragment()).toMatchSnapshot()
})
it('should match snapshot', () => {
  const {asFragment} =  render(<Dog name="yodog" isAdopted={false} />)
  expect(asFragment()).toMatchSnapshot()
})