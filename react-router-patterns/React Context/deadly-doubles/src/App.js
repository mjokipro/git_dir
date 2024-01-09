import React, { Component } from "react";
import Casino from "./Casino";

// example imports just as a demo of rendering the simple things
import Die from "./Die";
import DiceSet from "./DiceSet";
import DeadlyDoubles from "./DeadlyDoubles";
import PsychicDice from "./PsychicDice";
import RollEm from "./RollEm";
import Table from "./Table";
import Tables from "./Tables";
import SimpleDeadlyDoublesTable from "./SimpleDeadlyDoublesTable";
import SimpleTable from "./SimpleTable";

import "./App.css";

function App() {
  return (
    <div className="App">
      {/* For learning purposes --- lots of examples of inner components
            here, so you can play with the components in isolation.

            Rendering just Casino is the intended thing to do.
        */}

      {/*<Die val={3} />*/}
      {/*<DiceSet vals={[1, 2, 3]} />*/}
      {/*<RollEm />*/}
      {/*<PsychicDice addWin={() => "ignored"} addLoss={() => "ignored"} />*/}
      {/*<DeadlyDoubles addWin={() => "ignored"} addLoss={() => "ignored"} />*/}
      {/*<SimpleDeadlyDoublesTable />*/}
      {/*<SimpleTable game={DeadlyDoubles} title="Deadly Doubles" />*/}
      {/*<SimpleTable game={RollEm} title="Roll Em" />*/}
      {/*<Table game={DeadlyDoubles} title="Deadly Doubles" />*/}
      {/*<Tables />*/}
      <Casino />
    </div>
  );
}

export default App;
