/** Adds ability to "theme" the casino by letting the user pick the dice
 * color they want.
 *
 * It would be a pain to pass down the dice color from
 *   casino -> table -> [game] -> diceset -> die  ; this makes this easier
 *
 * This is referenced:
 * - in Casino, as it wraps the casino, so anything inside can get to color
 * - in Die, where it's used to pick the die color.
 *
 * For info: https://reactjs.org/docs/context.html
 *
 */

import React from "react";

const DiceColorContext = React.createContext();

export default DiceColorContext;
