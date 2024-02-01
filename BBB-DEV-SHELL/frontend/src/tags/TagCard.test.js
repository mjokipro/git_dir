import React from "react";
import { render } from "@testing-library/react";
import TagCardList from './TagCardList'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <TagCardList
        
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});