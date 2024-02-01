import { render } from '@testing-library/react';
import TagList from "./TagList"



it('Renders w/o crashing', function() {
render(<TagList />)

});
it('matches snapshot', function() {
 const {asFragment} = render(<TagList />)
expect(asFragment()).toMatchSnapshot()
});


import React from "react";
import { render } from "@testing-library/react";
import Jobs from "./JobList";

it("renders without crashing", function() {
  render(<Jobs />);
});

it("matches snapshot with no jobs", function() {
  const { asFragment } = render(<Jobs />);
  expect(asFragment()).toMatchSnapshot();
});
