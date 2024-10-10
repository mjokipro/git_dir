import React from "react";

/* Calculate the score for a single card. */
function getCardScore(card) {
  const val = card[0];
  if (val === "A") return 11;
  if (["0", "J", "Q", "K"].includes(val)) return 10;
  return +val;
}

/* Calculate the score for a hand of cards. */
function getTotalScore(cards) {
  let total = 0;
  for (let card of cards) {
    total += getCardScore(card);
  }
  return total;
}

/* Component to display score */
function Score(props) {
  const score = getTotalScore(props.cards);
  return (
    <div>
      <h2>Score: {score}</h2>
      {score === 21 ? <h4>🎉🎉🎉 BLACKJACK!!! 🎉🎉🎉</h4> : null}
    </div>
  );
}

export default Score;
