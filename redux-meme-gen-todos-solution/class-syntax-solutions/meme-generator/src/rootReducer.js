import { ADD_MEME, REMOVE_MEME } from "./actionTypes";
import uuid from "uuid/v4";

const DEFAULT_STATE = {
  memes: []
};

function rootReducer(state = DEFAULT_STATE, action) {
  if (action.type === ADD_MEME) {
    return {
      ...state,
      memes: [
        ...state.memes,
        {
          ...action.meme,
          id: uuid()
        }
      ]
    };
  }
  if (action.type === REMOVE_MEME) {
    return { ...state, memes: state.memes.filter(meme => meme.id !== action.id) };
  }
  return state;
}

export default rootReducer;
