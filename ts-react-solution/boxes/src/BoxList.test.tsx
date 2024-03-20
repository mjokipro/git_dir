import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

/** Convenience method for adding a box in these tests. */
function addBox(container: HTMLElement, height = 2, width = 3, color = "peachpuff") {
  const heightInput = container.querySelector("[name=height]");
  const widthInput = container.querySelector("[name=width]");
  const backgroundInput = container.querySelector("[name=backgroundColor]");

  fireEvent.change(backgroundInput!, { target: { value: color } });
  fireEvent.change(widthInput!, { target: { value: width } });
  fireEvent.change(heightInput!, { target: { value: height } });

  // better to test the button than submitting the form directly --- this way,
  // we are testing whether the button works as expected
  const button = container.querySelector(".NewBoxForm-addBtn");
  fireEvent.click(button!);
}


it("matches snapshot when no boxes", function () {
  const { container } = render(<BoxList />);
  expect(container).toMatchSnapshot();
});


// describe("adding boxes", function() {
//   it("can add a new box", function () {
//     const { container } = render(<BoxList />);

//     // no boxes yet
//     expect(container.querySelector(".Box")).not.toBeInTheDocument();

//     addBox(container);

//     // expect to see a box
//     const box = container.querySelector(".Box");
//     expect(box).toBeInTheDocument();
//     expect(box!.querySelector(".Box-box")).toHaveStyle(`
//     width: 3em;
//     height: 2em;
//     background-color: peachpuff;
//   `);
//   });

//   it("matches snapshot after adding box", function () {
//     const { container } = render(<BoxList />);
//     addBox(container);
//     expect(container).toMatchSnapshot();
//   })
// })


// describe("removing boxes", function () {
//   it("can remove a box", function () {
//     const { container } = render(<BoxList />);
//     addBox(container);

//     const removeBtn = container.querySelector(".Box-removeBtn") as Element;

//     fireEvent.click(removeBtn);
//     expect(removeBtn).not.toBeInTheDocument();
//   });

//   it("matches snapshot after removing box", function () {
//     const { container } = render(<BoxList />);
//     addBox(container);
//     fireEvent.click(container.querySelector(".Box-removeBtn") as Element);
//     expect(container).toMatchSnapshot();
//   })
// })
