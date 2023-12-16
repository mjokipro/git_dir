import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';
import './NewMemeForm';

const DEFAULT_STATE = {
  url: '',
  topText: '',
  bottomText: ''
};

class NewMemeForm extends Component {
  state = DEFAULT_STATE;

  handleSubmit = e => {
    e.preventDefault();
    this.props.addMeme({ ...this.state, id: uuidv4() });
    this.setState(DEFAULT_STATE);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <h2>Make a New Meme</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="url">Image URL</label>
          <input
            type="text"
            name="url"
            id="form_url"
            onChange={this.handleChange}
            value={this.state.url}
          />
          <label htmlFor="topText">Top Text</label>
          <input
            type="text"
            name="topText"
            id="form_topText"
            onChange={this.handleChange}
            value={this.state.topText}
          />
          <label htmlFor="bottomText">Bottom Text</label>
          <input
            type="text"
            name="bottomText"
            id="form_bottomText"
            onChange={this.handleChange}
            value={this.state.bottomText}
          />
          <button type="submit" id="form_submit">
            Generate Meme!
          </button>
        </form>
      </div>
    );
  }
}

export default NewMemeForm;
