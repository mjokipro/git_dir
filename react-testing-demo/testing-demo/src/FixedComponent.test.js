import React from "react";
import { render } from "@testing-library/react";
import FixedComponent from "./FixedComponent";

// smoke test
it("renders without crashing", function() {
  render(<FixedComponent />);
});

// snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<FixedComponent />);
  expect(asFragment()).toMatchSnapshot();
});
