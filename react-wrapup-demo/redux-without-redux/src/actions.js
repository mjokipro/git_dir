import { ADD_MEME, REMOVE_MEME } from "./actionTypes";

function addMeme(meme) {
  return {
    type: ADD_MEME,
    meme
  };
}

function removeMeme(id) {
  return {
    type: REMOVE_MEME,
    id
  };
}

export { addMeme, removeMeme };
