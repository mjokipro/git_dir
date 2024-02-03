
import React from "react";
import { render } from "@testing-library/react";
import ScriptureCardList from './ScriptureCardList'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <ScriptureCardList
            key={id}
            book_name={book_name}
            chapter={chapter}
            verse={verse}
            text={text}
        />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
