import React from "react";
import { render } from "@testing-library/react";
import FixedComponent from "./FixedComponent";

// smoke test
test('it renders without crashing', () => {
  render(<FixedComponent />)
})

test('it matches snapshot', () => {
  const {asFragment} = render(<FixedComponent />)
  expect(asFragment()).toMatchSnapshot()
})