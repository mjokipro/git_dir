const INITIAL_STATE = { count: 0 };

function countReducer(state=INITIAL_STATE, action) {
  if (action.type === "LOG_STATE") {
    // doesn't actually update state,
    // but let's make sure the action is processed
    console.log("ZOMG HERE IS THE STATE", state);
    return state;
  }

  // if we can't match the action type,
  // just return the state
  return state;
}

const store = Redux.createStore(countReducer);

store.dispatch({ type: "LOG_STATE" });
// will console log

store.dispatch({ type: "WILL_NOT_FIND_THIS" });
// won't console.log
// end

store.dispatch(); 
// error! dispatch wants an object
// end

store.dispatch({}); 
// error! dispatch wants an object with a type key
// end
