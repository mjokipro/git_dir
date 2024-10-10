import React, { useMemo } from "react";
import { getDivisors } from "./helpers";

function NumberDivisors({ num }) {
  // don't recompute the divisors
  // if the number is unchanged
  let divisors = useMemo(() => getDivisors(num), [num])
  
  return (
    <div>
      Here are all the divisors of {num}!
      <ul>
        {divisors.map(divisor => (
          <li key={divisor}>{divisor}</li>
        ))}
      </ul>
    </div>
  );
}

export default NumberDivisors;
