import React from "react";
import CardList from "./CardList";
import Score from "./Score";
import "./BlackjackGame.css";

/* Get a random element from an array */
function choice(values) {
  const randIdx = Math.floor(Math.random() * values.length);
  return values[randIdx];
}

/* Get a random value, suit combination from card data. */
function getCard(values, suits) {
  const randomVal = choice(values);
  const randomSuit = choice(suits);
  return randomVal + randomSuit;
}

/* Get numCards random cards, with no duplicates. */
function getCards(values, suits, numCards = 1) {
  const cardsArr = [getCard(values, suits)];
  while (cardsArr.length < numCards) {
    let randomCard = getCard(values, suits);
    if (!cardsArr.includes(randomCard)) cardsArr.push(randomCard);
  }
  return cardsArr;
}

/* Main game component */
function BlackjackGame(props) {
  const pairOfCards = getCards(props.values, props.suits, 2);
  return (
    <div className="BlackjackGame">
      <CardList cards={pairOfCards} />
      <Score cards={pairOfCards} />
    </div>
  );
}

BlackjackGame.defaultProps = {
  values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"],
  suits: ["C", "D", "H", "S"]
};

export default BlackjackGame;
