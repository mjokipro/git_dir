import React from "react";
import { render } from "@testing-library/react";
import BrokenComponent from "./BrokenComponent";

it("renders without crashing", function() {
  render(<BrokenComponent />);
});
