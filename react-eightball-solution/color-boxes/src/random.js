/** Return a random item from a list. */

function choice(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

/** Return integer 0 up to but not max */

function randInt(max) {
  return Math.floor(Math.random() * max)
}


export { choice, randInt };