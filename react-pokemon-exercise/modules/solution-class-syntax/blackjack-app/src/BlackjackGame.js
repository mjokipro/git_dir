import React, { Component } from "react";
import CardList from "./CardList";
import Score from "./Score";
import "./BlackjackGame.css"

/* Main game components */
class BlackjackGame extends Component {
  static defaultProps = {
    values: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K"],
    suits: ["C", "D", "H", "S"]
  };

  /* Get a random element from an array */
  _choice(arr) {
    const randIdx = Math.floor(Math.random() * arr.length);
    return arr[randIdx];
  }

  /* Get a random value, suit combination from the card data in props. */
  getCard() {
    const randomVal = this._choice(this.props.values);
    const randomSuit = this._choice(this.props.suits);
    return randomVal + randomSuit;
  }

  /* Get numCards random cards, with no duplicates. */
  getCards(numCards=1) {
    const cardsArr = [this.getCard()];
    while (cardsArr.length < numCards) {
      let randomCard = this.getCard();
      if (!cardsArr.includes(randomCard)) cardsArr.push(randomCard);
    }
    return cardsArr;
  }

  render() {
    const pairOfCards = this.getCards(2);
    return (
      <div className="BlackjackGame">
        <CardList cards={pairOfCards} />
        <Score cards={pairOfCards} />
      </div>
    );
  }
}

export default BlackjackGame;
