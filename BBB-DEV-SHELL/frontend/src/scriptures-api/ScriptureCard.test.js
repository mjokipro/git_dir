
import React from "react";
import { render } from "@testing-library/react";
import ScriptureCard from './ScriptureCard'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <ScriptureCard
            // to_user="test"
            // from_user="test"
            // body="test"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
