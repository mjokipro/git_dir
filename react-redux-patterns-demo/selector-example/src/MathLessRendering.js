import React from "react";
import { useSelector } from "react-redux";

/* Generate arithmetic facts about numbers in the redux store. */
function MathLessRendering() {
  const num1 = useSelector(st => st.num1);
  const num2 = useSelector(st => st.num2);

  console.log("MATH_LESS_RENDERING RENDERING");

  return (
    <div>
      <div>
        <h3>Math Facts (with less rendering)</h3>
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

export default MathLessRendering;
