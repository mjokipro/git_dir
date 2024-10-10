
import React from "react";
import { render } from "@testing-library/react";
import ScriptureDetail from './ScriptureDetail'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <ScriptureDetail
   
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
