import React from "react";
import "./ColorButtons.css";

/** Renders button for each color option.
 *
 * Props:
 * - options: array of colors
 */

const ColorButtons = ({addCircle, options}) => {

    return (
      <div className="ColorButton">
        {options.map(color => 
          (
            <button 
            onClick={() => addCircle(color)}
            className="ColorButtons-button"
            style={{backgroundColor: color}}>
              {color}
            </button>
            
          )
        )}
      </div>
    )
}

export default ColorButtons;
