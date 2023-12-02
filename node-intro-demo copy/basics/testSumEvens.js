// what's wrong with this code??
//  Use the debugger to find out!

function testSumEvens(...nums) {
  let sum = 0;

  for (let num in nums) {
    if (num % 2 === 0) {
      sum += num;
    }
  }

  return sum;
}

testSumEvens(1,2,3,4,5,6);