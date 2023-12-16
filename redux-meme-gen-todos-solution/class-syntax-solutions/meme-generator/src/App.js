import React, { Component } from "react";
import NewMemeForm from "./NewMemeForm";
import Meme from "./Meme";
import "./App.css";
import { connect } from "react-redux";
import { addMeme, removeMeme } from "./actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.deleteMeme = this.deleteMeme.bind(this);
    this.addMeme = this.addMeme.bind(this);
  }

  addMeme(newMeme) {
    this.props.dispatch(addMeme(newMeme));
  }

  deleteMeme(id) {
    this.props.dispatch(removeMeme(id));
  }

  render() {
    return (
      <div className="App">
        <NewMemeForm addMeme={this.addMeme} />
        <hr />
        {this.props.memes.map(m => (
          <Meme
            key={m.id}
            topText={m.topText}
            bottomText={m.bottomText}
            url={m.url}
            deleteMeme={() => this.deleteMeme(m.id)}
          />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    memes: state.memes
  };
}

export default connect(mapStateToProps)(App);
