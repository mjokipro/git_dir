const DEFAULT_STATE = {
  face: '┐( ˘_˘ )┌'
};

function moodReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'MOOD_HAPPY':
      return { ...state, face: action.payload };
    case 'MOOD_SAD':
      return { ...state, face: action.payload };    
    case 'MOOD_ANGRY':
      return { ...state, face: action.payload };
    case 'MOOD_CONFUSED':
      return { ...state, face: action.payload };
    default:
      return state;
  }
}
