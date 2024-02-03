
import React from "react";
import { render } from "@testing-library/react";
import ScriptureList from './ScriptureList'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <ScriptureList
   
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
