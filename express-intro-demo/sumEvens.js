/** sum evens: array -> sum of all even numbers */

function sumEvens(numbers) {
  let total = 0;
  for (let num of numbers) {
    if (num % 2 === 0) {
      total += num;
    }
  }

  return total
}
