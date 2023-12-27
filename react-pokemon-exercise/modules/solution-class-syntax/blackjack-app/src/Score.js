import React, { Component } from "react";

class Score extends Component {
  getCardScore(cardId) {
    const val = cardId[0];
    if (val === 'A') return 11;
    if (['0', 'J', 'Q', 'K'].includes(val)) return 10;
    return +val;
  }

  getTotalScore() {
    let total = 0;
    for (let card of this.props.cards) {
      total += this.getCardScore(card);
    }
    return total;
  }

  render() {
    const score = this.getTotalScore()
    return (
      <div>
        <h2>Score: {score}</h2>
        {score === 21 ? <h4>🎉🎉🎉 BLACKJACK!!! 🎉🎉🎉</h4> : null}
      </div>
    )
  }
}

export default Score;
