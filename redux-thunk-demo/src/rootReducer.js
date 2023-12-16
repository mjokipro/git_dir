const INITIAL_STATE = {
  profile: {},
  error: false
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_PROFILE':
      return { ...state, profile: action.profile };

    case 'ERROR':
      return { ...state, error: true };

    default:
      return state;
  }
}

export default rootReducer;
