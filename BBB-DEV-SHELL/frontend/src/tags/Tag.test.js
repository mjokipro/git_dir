import React from "react";
import { render } from "@testing-library/react";
import Tag from './Tag'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <Tag
            name="test"
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});