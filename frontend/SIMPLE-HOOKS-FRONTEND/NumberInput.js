import React, { useState } from "react";

function NumberInput({ getFact, initialNum }) {
  const [val, setVal] = useState(initialNum);

  const handleChange = evt => {
    setVal(evt.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    getFact(val);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="number">Number: </label>
      <input
        type="number"
        value={val}
        onChange={handleChange}
        id="number"
        step={1}
        min={0}
      />
      <button>Tell me about this number!</button>
    </form>
  );
}

export default NumberInput;
