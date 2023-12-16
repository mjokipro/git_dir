/** Useful utilities for dice games. */

/** Return array of random dice values. */

function rollDice(numDice, numSides) {
  return Array.from({ length: numDice }, () =>
    Math.floor(Math.random() * numSides)
  );
}

/** sum of dice values. */

function sum(vals) {
  return vals.reduce((total, val) => total + val || 0, 0);
}

/** Are there doubles in this set of dice? */

function hasDoubles(vals) {
  return vals.length > new Set(vals).size;
}

export { rollDice, sum, hasDoubles };
