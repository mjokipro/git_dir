const INITIAL_STATE = {count: 0}

const countReducer = (state=INITIAL_STATE, action) => {
    if(action.type === 'LOG_STATE'){
        console.log("state", state)
        return state;
    }
    // IF ACTION NOT MATCHED
    return state;
}

const store = Redux.createStore(countReducer);
// store.dispatch({type: 'LOG_STATE'})
