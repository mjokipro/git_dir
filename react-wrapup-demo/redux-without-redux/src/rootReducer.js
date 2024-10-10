import * as t from "./actionTypes";

function rootReducer(state, action) {
  if (action.type === t.ADD_MEME) {
    return {
      ...state,
      memes: [
        ...state.memes, { ...action.meme }
      ]
    };
  }
  if (action.type === t.REMOVE_MEME) {
    return {
      ...state,
      memes: state.memes
              .filter(m => m.id !== action.id)
    };
  }
  return state;
}

export default rootReducer;
