import React, { useContext } from "react";
import DispatchContext from "./dispatchContext";
import { removeMeme } from "./actions";
import "./Meme.css";

function Meme({ topText, botText, url, id }) {
  const dispatch = useContext(DispatchContext);
  const remove = () => dispatch(removeMeme(id));

  return (
    <div id="foo" className="Meme">
      <div className="container">
        <span className="text-t">{topText}</span>
        <img src={url} alt="a meme" />
        <span className="text-b">{botText}</span>
        <button onClick={remove}>
          DELETE
        </button>
      </div>
    </div>
  );
}

export default React.memo(Meme);
