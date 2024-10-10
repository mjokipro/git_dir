import React from "react";
import { render } from "@testing-library/react";
import PostDetail from './PostDetail'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <PostDetail
            title="test"
            content="test"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});