import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { change } from "./actions";

/* Render two inputs to change numbers in the redux store. */
function NumberInputs() {
  const { num1, num2 } = useSelector(st => ({ num1: st.num1, num2: st.num2 }));
  const [inputs, setInputs] = useState({ num1, num2 });
  const dispatch = useDispatch();

  function handleChange(evt) {
    const { name, value } = evt.target;
    setInputs(inputs => ({ ...inputs, [name]: +value }));
  }

  console.log("NUMBER_INPUTS RENDERING");

  return (
    <div>
      <div>
        <label htmlFor="num1">First number:</label>
        <input
          type="number"
          value={inputs.num1}
          name="num1"
          id="num1"
          onChange={handleChange}
        />
        <button onClick={() => dispatch(change("num1", inputs.num1))}>
          Change first number
        </button>
      </div>
      <div>
        <label htmlFor="num2">Second number:</label>
        <input
          type="number"
          value={inputs.num2}
          name="num2"
          id="num2"
          onChange={handleChange}
        />
        <button onClick={() => dispatch(change("num2", inputs.num2))}>
          Change second number
        </button>
      </div>
    </div>
  );
}

export default NumberInputs;
