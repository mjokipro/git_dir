import React from "react";
import NewMemeForm from "./NewMemeForm";
import Meme from "./Meme";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const memes = useSelector(st => st.memes);
  const dispatch = useDispatch();

  function addMeme(newMeme) {
    dispatch({ type: "ADD_MEME", meme: newMeme });
  }

  function deleteMeme(id) {
    dispatch({type: "REMOVE_MEME", id });
  }

  const memeComps = memes.map(m => (
    <Meme
      key={m.id}
      topText={m.topText}
      bottomText={m.bottomText}
      url={m.url}
      deleteMeme={() => deleteMeme(m.id)}
    />
  ));

  return (
    <div className="App">
      <NewMemeForm addMeme={addMeme} />
      <hr />
      {memeComps}
    </div>
  );
}

export default App;
