import React from "react";
import { render } from "@testing-library/react";
import User from './User'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <User
            username="test"
            firstName="test"
            lastName="test"
            email="test@test.com"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});