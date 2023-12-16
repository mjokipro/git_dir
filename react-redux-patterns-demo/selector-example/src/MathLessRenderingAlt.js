import React from "react";
import { useSelector, shallowEqual } from "react-redux";

/* Generate arithmetic facts about numbers in the redux store. */
function MathLessRenderingAlt() {
  const { num1, num2 } = useSelector(
    st => ({ num1: st.num1, num2: st.num2 }),
    shallowEqual // does a shallow equality check on the values
  );

  console.log("MATH_LESS_RENDERING_ALT RENDERING");

  return (
    <div>
      <div>
        <h3>Math facts (also with less rendering)</h3>
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

export default MathLessRenderingAlt;
