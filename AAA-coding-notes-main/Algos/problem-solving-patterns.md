## Common patterns
- Frequency Counter
- Multiple Pointers
- Sliding Window
- Divide and Conquer
- Greedy Algorithms
- Backtracking
- Many more!
- & Note: Not every problem fits into one of these buckets! 

## Frequency Counter
- This pattern tracks the frequency of values
- Using an object can often avoid nested loops or O(n2) operations
- Example: 
```js

/* Write a function that accepts 2 arrays as input. This function should return true if every value in array has its corresponding value squared in the second array. The order doesn’t matter, but the frequency must be the same. */

squares([1, 2, 3], [4, 1, 9]);  // true
squares([1, 2, 3], [1, 9]);     // false
squares([1, 2, 1], [4, 4, 1]);  // false (must be same freq)
```
- Naive solution:
```js
function squares(nums1, nums2) {
  if (nums1.length !== nums2.length) {
    return false;
  }

  for (let i = 0; i < nums1.length; i++) {
    const foundAt = nums2.indexOf(nums1[i] ** 2);

    if (foundAt === -1) {
      return false;
    }

    nums2.splice(foundAt, 1);
  }

  return true;
}
```
- Solution using freq counter:
```js
function getFrequencyCounter(items) {
  const freqs = {};

  for (const item of items) {
    const curr = freqs[item] || 0;
    freqs[item] = curr + 1;
  }

  return freqs;
}

function squaresWithFreqCounter(nums1, nums2) {
  if (nums1.length !== nums2.length) return false;

  const freqs1 = getFrequencyCounter(nums1);
  const freqs2 = getFrequencyCounter(nums2);

  for (let key in freqs1) {
    const squared = key ** 2;

    if (!squared in freqs2) {
      return false;
    }

    if (freqs2[squared] !== freqs1[key]) {
      return false;
    }
  }

  return true;
}
```
- & You can also use Map to make a freq counter:
```js
// a function to create a simple
// frequency counter using a map

function getFrequencyCounter(items) {
  let freqs = new Map();

  for (let item of items) {
    let curr = freqs.get(item) || 0;
    freqs.set(item, curr + 1);
  }

  return freqs;
}
```


## Multiple Pointers
- Creating _pointers_ (values that correspond to an index) and moving those pointers based on a certain condition
- Often (but not always) with a sorted array that we’re trying to extract some information out of.
- & When using this method - DRAW it out
- Example:
```js
/* sumZero accepts a **sorted** array of integers. It should find the first pair where the sum is 0.

Return an array that includes both values that sum to zero or throw an error if a pair does not exist.
*/

sumZero([-3, -2, -1, 0, 1, 2, 3]);  // [-3,3]
sumZero([-2, 0, 1, 3]);          // throws error
sumZero([1, 2, 3]);              // throws error
```
- Naive solution with O(n^2) time complexity:
```js
function sumZero(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === 0) {
        return [nums[i], nums[j]];
      }
    }
  }

  throw new Error("Pair not found");
}
```
- Using Multiple pointers with O(n) time complexity:
```js
function sumZeroMultiplePointers(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === 0) {
      return [nums[left], nums[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }

  throw new Error("Pair not found");
}
```


## Sliding Window
- Two loops:
	- First loop sets a 'standard'
	- Second loop moves like a sliding window, "Adding" in some way the next element while "removing" the previous element.
```js
 /** Given an array of integers and a number, write a function called **maxSubarraySum**, which finds the maximum sum of a subarray with the length of the number passed to the function.

Note that a subarray must consist of _consecutive_ elements from the original array. In the first example below, [100, 200, 300] is a subarray of the original array, but [100, 300] is not. */
function maxSubarraySum(array, num){
    if (array.length < num) return null;
    // have variable for sum
    let maxSum = 0;
    // first loop grabs first num numbers & updates sum
    for (let i = 0; i < num; i++){
      maxSum += array[i];
    }
  	let currentSum = maxSum;
    // second loop starts at num index, goes through and 
    for (let j = num; j < array.length; j++){
      	currentSum += array[j] - array[j - num];
        // adds next element, subtracts first element and checks if larger than sum 
        if (currentSum > maxSum){
            // updates sum if so 
            maxSum = currentSum;
        }
    }
    return maxSum; 
}

console.log(maxSubarraySum([100,200,300,400], 2)); // 700
console.log(maxSubarraySum([1,4,2,10,23,3,1,0,20], 4));  // 39 
console.log(maxSubarraySum([-3,4,0,-2,6,-1], 2)); // 5
console.log(maxSubarraySum([3,-2,7,-4,1,-1,4,-2,1],2)); // 5
console.log(maxSubarraySum([2,3], 3)); // null
```