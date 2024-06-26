import React from "react";
import { render } from "@testing-library/react";
import UserCard from './UserCard'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <UserCard
            username="test"
            firstName="test"
            lastName="test"
            email="test@test.com"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});