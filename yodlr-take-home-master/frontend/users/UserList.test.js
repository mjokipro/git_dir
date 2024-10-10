import React from "react";
import { render } from "@testing-library/react";
import UserList from './UserList'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserList
            username="test"
            firstName="test"
            lastName="test"
            email="test@test.com"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});