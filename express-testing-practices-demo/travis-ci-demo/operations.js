function add(a = 0, b = 0) {
  return a + b;
}

function average(...numbers) {
  let total = 0;
  if (numbers.length === 0) return 0;
  for (let num of numbers) {
    total += num;
  }
  return total / numbers.length;
}

module.exports = { add, average };
