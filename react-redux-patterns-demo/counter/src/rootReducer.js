import { INCREMENT, DECREMENT } from "./actionTypes";

const INITIAL_STATE = { count: 0 };

function rootReducer(state = INITIAL_STATE, action) {
  console.log("reducer ran; state & action:", state, action);

  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };

    case DECREMENT:
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
}
// end

export default rootReducer;
