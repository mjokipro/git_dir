import React, {Component} from 'react';
import './Pokecard.css';

const POKE_API = 'https://raw.githubusercontent.com/' +
    'PokeAPI/sprites/master/sprites/pokemon/';


/** Individual Pokemon card. */

class Pokecard extends Component {
  render() {
    let imgSrc = `${POKE_API}${this.props.id}.png`;

    return (
        <div className="Pokecard">
          <div className="Pokecard-title">{ this.props.name }</div>
          <img className="Pokecard-image" src={imgSrc} />
          <div className="Pokecard-data">Type: {this.props.type}</div>
          <div className="Pokecard-data">EXP: {this.props.exp}</div>
        </div>
    )
  }
}


export default Pokecard