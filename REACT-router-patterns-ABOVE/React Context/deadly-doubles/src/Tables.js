import React from "react";
import Table from "./Table";
import DeadlyDoubles from "./DeadlyDoubles";
import PsychicDice from "./PsychicDice";
import RollEm from "./RollEm";

function Tables() {
  return (
    <div className="Tables">
      <Table
        title="Deadly Doubles"
        description="Reach the sum before a deadly double takes you down!"
        game={DeadlyDoubles}
      />

      <Table
        title="Deadly Doubles 4 x d12"
        description="Deadly Doubles, but with four 12-sided dice"
        game={DeadlyDoubles}
        numDice={4}
        numSides={12}
      />

      <Table
        title="Psychic Dice"
        description="Did you guess the roll results?"
        game={PsychicDice}
      />

      <Table
        title="Roll 'Em"
        description="Kids! Practice rolling — so you, too, can gamble one day!"
        game={RollEm}
      />
    </div>
  );
}

export default Tables;
