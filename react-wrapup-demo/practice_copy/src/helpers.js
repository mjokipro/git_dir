/* Determine all the divisors of a given number.
 * Example: getDivisors(8); // [1, 2, 4, 8] */
function getDivisors(num) {

  console.log("Running getDivisors...");
  
  let divisors = [];

  // get all small divisors
  // (those less than or equal to the square root)
  let end = Math.floor(Math.sqrt(num));
  for (let int = 1; int <= end; int++) {
    if (num % int === 0) {
      divisors.push(int);
    }
  }

  // divisors always come in pairs,
  // so we can use the small ones to get the large ones.
  for (let i = divisors.length - 1; i >= 0; i--) {
    let int = divisors[i];
    // if the number is a perfect square,
    // don't count the square root twice.
    if (int * int === num) continue;
    divisors.push(num / int);
  }

  return divisors;
}

export { getDivisors };
