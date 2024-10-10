import { ADD_MEME, REMOVE_MEME } from "./actionTypes";

export function addMeme(meme) {
  return {
    type: ADD_MEME,
    meme
  };
}

export function removeMeme(id) {
  return { type: REMOVE_MEME, id };
}
