// set up store
const store = Redux.createStore(moodReducer);

// subscribe renderFace to face changes
const face = document.getElementById('face');

// listeners for the buttons
document.getElementById('happy').addEventListener('click', () => {
  store.dispatch({ type: 'MOOD_HAPPY', payload: '٩(◕‿◕｡)۶' });
});

document.getElementById('sad').addEventListener('click', () => {
  store.dispatch({ type: 'MOOD_SAD', payload: '(ಥ﹏ಥ)' });
});
document.getElementById('angry').addEventListener('click', () => {
  store.dispatch({ type: 'MOOD_ANGRY', payload: '٩(ఠ益ఠ)۶' });
});
document.getElementById('confused').addEventListener('click', () => {
  store.dispatch({ type: 'MOOD_CONFUSED', payload: 'ლ(ಠ_ಠ ლ)' });
});

function renderFace() {
  face.innerHTML = store.getState().face;
}

renderFace()
store.subscribe(renderFace)