import React from "react";
import { render } from "@testing-library/react";
import MessageCard from './MessageCard'
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
      <MemoryRouter>
          <MessageCard 
                            // messages={m.messages}
                            // key={m.id}
                            // id={m.id}
                            //     name={m.from_user}
                            //     value={m.from_user}
                            //     from_user={m.from_user}
                            //     to_user={m.to_user}
                            //     body={m.body}
                            />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});