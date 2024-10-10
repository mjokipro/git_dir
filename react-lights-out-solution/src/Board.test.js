import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("<Board /> rendering", function () {
  describe("inital board and win state", function () {
    it("renders without crashing", function () {
      render(<Board />);
    });

    it("matches snapshot for full board", function () {
      const { asFragment } = render(<Board chanceLightStartsOn={1} />);
      expect(asFragment()).toMatchSnapshot();
    });

    it("shows win state when lights are out", function () {
      const { getByText } = render(<Board chanceLightStartsOn={0} />);
      expect(getByText("You Win!")).toBeInTheDocument();
    });
  });

  describe("cell click", function () {
    it("toggles lights correctly", function () {
      const { getAllByRole } = render(
          <Board nrows={3} ncols={3} chanceLightStartsOn={1} />,
      );
      const cells = getAllByRole("button");

      // all cells start out as lit
      cells.forEach(cell => {
        expect(cell).toHaveClass("Cell-lit");
      });

      // click on the middle cell
      fireEvent.click(cells[4]);

      // now only cells at the corners should be lit
      let litIndices = [0, 2, 6, 8];
      cells.forEach((cell, idx) => {
        if (litIndices.includes(idx)) {
          expect(cell).toHaveClass("Cell-lit");
        } else {
          expect(cell).not.toHaveClass("Cell-lit");
        }
      });
    });

    it("says that you won when you click the board", function () {
      // create a board that can be completed in one click
      const { queryByText, getAllByRole } = render(
          <Board nrows={1} ncols={3} chanceLightStartsOn={1} />,
      );

      // the game isn't won yet
      expect(queryByText("You Win!")).not.toBeInTheDocument();

      // clicking on the middle cell wins the game
      const cells = getAllByRole("button");
      fireEvent.click(cells[1]);
      expect(queryByText("You Win!")).toBeInTheDocument();
    });
  });
});
