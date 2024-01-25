import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import NumberInput from "./NumberInput";
import NumberDivisors from "./NumberDivisors";

function NumberFactUseCallback({
  baseUrl = "http://numbersapi.com/", initialNum = 42
}) {
  const [num, setNum] = useState(initialNum);
  const [fact, setFact] = useState("");
  const getFact = useCallback(async newNum => {
    let response = await axios.get(`${baseUrl}${newNum}?json`);
    setNum(newNum);
    setFact(response.data.text);
  }, [baseUrl]);

  useEffect(() => { getFact(initialNum); }, [initialNum, getFact]);

  return (
    <div>
      <NumberInput getFact={getFact} initialNum={initialNum} />
      {fact
        ? <div><h3>{num}</h3><p>{fact}</p></div>
        : <p>Loading...</p>}
      <NumberDivisors num={num} />
    </div>
  );
}

export default NumberFactUseCallback;
