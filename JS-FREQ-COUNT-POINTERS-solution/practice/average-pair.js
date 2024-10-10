



// function countPairs(arr, num) {
//   arr.sort((a, b) => a - b)
//   console.log(arr)
//   let count = 0
//   let start = 0
//   let end = arr.length - 1  // 4
//       // 0       0
//   while(start < end){
//     let sum = arr[start] + arr[end]
//     console.log(`sum = ${arr[start]} + ${arr[end]}`)
//     if(sum === num){
//       count++
//       start++
//       end--
//       console.log("count", count, "start", start, "end", end)
//     } else if (sum < num){
//       console.log("count", count)
//       start++
//     } else {
//       console.log("count", count)
//       end--
//     }
//   }

//   return count
// }

// const newStuff = countPairs([1, 2, 3, 1, 2], 2)

// function longestFall(arr) {
//   let nums = arr
//   let counter = 1;
//   let maxCounter = 0;

//   // quick fail case if the array is empty
//   if (nums.length === 0) {
//     return 0;
//   }

//   for (let i = 1; i < nums.length; i++) {
//     // if current number is smaller than the previous number
//     if (nums[i] < nums[i - 1]) {
//       counter++;
//       maxCounter = Math.max(counter, maxCounter);
//     } else {
//       counter = 1;
//     }
//   }

//   // 1 is the default value for a non-empty array
//   return maxCounter || 1;
// }




/**
 * The function relies on the fact that the array is sorted
 *  to calculate the running average of every two numbers.
 *  It does this by putting one pointer at the start of the
 *  array and one pointer at the end of the array.
 *
 *  At each point, if the average is less than the target num, we have to
 *  move the left pointer up, while the right can stay put. Otherwise if
 *  the average is greater than the sum, we move the right pointer down.
 *
 *  The function ends either when we've found the correct average, or
 *  the pointers have crossed paths (i.e. when the start is greater than the end),
 *  at which point we can conclude there is no truthy answer.
 */
// function averagePair(arr, num) {
//   let start = 0; // left pointer
//   let end = arr.length - 1; // right pointer

//   while (start < end) {
//     let avg = (arr[start] + arr[end]) / 2;
//     if (avg === num) {
//       return true;
//     } else if (avg < num) {
//       start++;
//     } else {
//       end--;
//     }
//   }
//   return false;
// }
