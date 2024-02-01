import React from "react";
import { render } from "@testing-library/react";
import Tag from "./Tag";
import { UserProvider } from "../testUtils";


it("matches snapshot", function () {
  let name = { name: "test" };
  const { asFragment } = render(
      <UserProvider>
        <Tag name={name} />
      </UserProvider>,
  );
  expect(asFragment()).toMatchSnapshot();
});
