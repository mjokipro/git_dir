import { CHANGE_NUM } from "./actionTypes";

const INITIAL_STATE = { num1: 0, num2: 0 };

function rootReducer(state = INITIAL_STATE, action) {
  console.log("reducer ran; state & action:", state, action);

  switch (action.type) {
    case CHANGE_NUM:
      return { ...state, [action.num]: action.value };

    default:
      return state;
  }
}
// end

export default rootReducer;
