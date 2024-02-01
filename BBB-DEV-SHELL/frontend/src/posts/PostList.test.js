import React from "react";
import { render } from "@testing-library/react";
import PostList from './PostList'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <PostList
            title="test"
            content="test"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});