import React from "react";
import { useSelector } from "react-redux";

/* Generate arithmetic facts about numbers in the redux store. */
function Math() {
  const { num1, num2 } = useSelector(st => ({
    num1: st.num1,
    num2: st.num2
  }));

  console.log("Math rendered");

  return (
    <div>
      <div>
        <h3>Math Facts</h3>
        <ul>
          <li>Sum: {num1 + num2}</li>
          <li>Difference: {num1 - num2}</li>
          <li>Product: {num1 * num2}</li>
          <li>Quotient: {num1 / num2}</li>
        </ul>
      </div>
    </div>
  );
}

export default Math;
