import * as random from "./random";

random.choice = jest.fn();

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EightBall from "./EightBall";


const answers = [
  { msg: "No", color: "red" },
];


it("renders initially", function () {
  let { queryByText } = render(<EightBall answers={answers} />);

  expect(queryByText("Yes")).not.toBeInTheDocument();
  expect(queryByText("Think of a Question.")).toBeInTheDocument();
});

it("changes on click", function () {
  random.choice
      .mockReturnValueOnce({ msg: "Yes", color: "red" })
      .mockReturnValueOnce({ msg: "Maybe", color: "pink" });

  let { container, queryByText } = render(<EightBall answers={answers} />);

  fireEvent.click(container.querySelector(".EightBall"));

  expect(queryByText("Yes")).toBeInTheDocument();
  expect(queryByText("Think of a Question.")).not.toBeInTheDocument();

  fireEvent.click(container.querySelector(".EightBall"));

  expect(queryByText("Maybe")).toBeInTheDocument();
  expect(queryByText("Yes")).not.toBeInTheDocument();
});