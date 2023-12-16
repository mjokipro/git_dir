import React, { useContext } from "react";
import Meme from "./Meme";
import MemeContext from "./memeContext";

function MemeList() {
  const memes = useContext(MemeContext);

  return (
    <div>
      {memes.map(m => (
        <Meme
          key={m.id}
          topText={m.topText}
          botText={m.bottomText}
          url={m.url}
          id={m.id}
        />
      ))}
    </div>
  );
}

export default MemeList;
