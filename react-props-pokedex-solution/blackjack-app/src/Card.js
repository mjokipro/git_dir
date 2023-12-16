import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <img
      className="Card"
      src={`https://deckofcardsapi.com/static/img/${props.cardId}.png`}
      alt={`${props.cardId} playing card`}
    />
  );
}

export default Card;
