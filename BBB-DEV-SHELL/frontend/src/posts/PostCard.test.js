import React from "react";
import { render } from "@testing-library/react";
import PostCard from './PostCard'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <PostCard
            title="test"
            content="test"
            body="test"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});