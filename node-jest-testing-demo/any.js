const TOYS = ["doll", "top", "iPad"];

function getRandomToy() {
  let idx = Math.floor(
      Math.random() * TOYS.length + 1);
  return {
    toy: {
      name: TOYS[idx],
      price: 34.99
    }
  };
}


module.exports = {getRandomToy};