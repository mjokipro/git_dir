import React from "react";
import { render } from "@testing-library/react";
import UserDetail from './UserDetail'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserDetail
            username="test"
            firstName="test"
            lastName="test"
            email="test@test.com"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});