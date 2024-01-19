import React from "react";
import { render } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { UserProvider } from "../testUtils";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <ProfileForm />
      </UserProvider>
      </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
