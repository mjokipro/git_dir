import * as random from "./random";

random.choice = jest.fn();


import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxesContainer from "./BoxesContainer";


it("renders initially", function () {
  random.choice.mockReturnValue("red");

  let { container } = render(<BoxesContainer numBoxes={1} />);
  const style = container.querySelector(".Box").getAttribute("style");
  expect(style).toEqual("background-color: red;");
});

it("changes on click", function () {
  random.choice.mockReturnValueOnce("red");
  let { container } = render(<BoxesContainer numBoxes={1} />);

  random.choice.mockReturnValueOnce("pink");
  fireEvent.click(container.querySelector("button"));

  const style = container.querySelector(".Box").getAttribute("style");
  expect(style).toEqual("background-color: pink;");
});