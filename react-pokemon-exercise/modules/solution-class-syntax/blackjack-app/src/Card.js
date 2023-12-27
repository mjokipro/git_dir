import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  render() {
    return (
      <img
        className="Card"
        src={`https://deckofcardsapi.com/static/img/${this.props.cardId}.png`}
        alt={`${this.props.cardId} playing card`}
      />
    );
  }
}

export default Card;
