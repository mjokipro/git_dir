import React, { useState, useEffect } from "react";
import axios from "axios";
import NumberInput from "./NumberInput";

function NumberFactMissingDep({
  baseUrl = "http://numbersapi.com/", initialNum = 42
}) {
  const [num, setNum] = useState(initialNum);
  const [fact, setFact] = useState("");
  async function getFact(newNum) {
    let response = await axios.get(`${baseUrl}${newNum}?json`);
    setNum(newNum);
    setFact(response.data.text);
  }

  useEffect(() => { getFact(initialNum) }, []);

  return (
    <div>
      <NumberInput getFact={getFact} initialNum={initialNum} />
      {fact
        ? <div><h3>{num}</h3><p>{fact}</p></div>
        : <p>Loading...</p>}
    </div>
  );
}

export default NumberFactMissingDep;
