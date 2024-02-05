import React, { useState } from "react";
import Circle from "./Circle";
import ColorButtons from "./ColorButtons";

/** Show color circles buttons and circles.
 *
 * State:
 * - circles: array of circle colors: ["red", "blue"]
 **/

function getRandom(min = 0, max = 100){
  return Math.random() * (max - min) + min
}

const ColorfulCircles = () => {
const [circles, setCircles] = useState([])

const addCircle = (color) => {
  setCircles(circles => [...circles, {color, x: getRandom(), y: getRandom() }])
}

const changePosition = (idx) => {
  setCircles(circles => {
    const copy = [...circles]
    copy[idx].x = getRandom()
    copy[idx].y = getRandom()
    return copy
  })
}

  return (
    <div>
      <ColorButtons addCircle={addCircle} options={['purple', 'orange', 'yellow']} />
      
      { circles.map( ({color, x, y}, i) => 
        <Circle 
        changePosition={changePosition}
        color={color}
        idx={i}
        key={i}
        x={x}
        y={y} /> ) }
    </div>
  )
}

export default ColorfulCircles;
