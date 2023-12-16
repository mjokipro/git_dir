import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Meme.css";

class Meme extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteMeme = this.handleDeleteMeme.bind(this);
  }

  handleDeleteMeme() {
    this.props.deleteMeme(this.props.id);
  }

  render() {
    const { topText, bottomText, url } = this.props;
    return (
      <div id="foo" className="Meme">
        <div className="container">
          <span className="top-text">{topText}</span>
          <img src={url} alt="a meme" />
          <span className="bottom-text">{bottomText}</span>
          <button id="meme_deleteBtn" onClick={this.handleDeleteMeme}>
            DELETE
          </button>
        </div>
      </div>
    );
  }
}

Meme.propTypes = {
  topText: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired
};

export default Meme;
