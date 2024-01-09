
---
date: 2023-04-26
metadata: true
concepts: ['sort', 'data-structures', 'recursion', 'comparison']
status: 'pre-lecture'
docs: 
cite: ['udemy-data-structures']
---

## Merge Sort

- Complexities:
	- Time: `O(nlogn)`  - True for worst, average, and best case scenarios
		- –> as n grows, need to make log n splits
		- –> as n grows, make n comparisions to merge back together
		- hence, `nlogn` time
	- Space: `O(n)`
- How it works:
	- Takes advantage of fact that 0-1 element arrays are already sorted
	- Split up larger array into smaller arrays, then merge them back together
		- When merging back together 1:1
			-  Just compare the each item, smaller goes first
		- When merging 2:2, 
			- compare 1st item to 1st item, smaller goes first
			- compare 2nd item to 1st item 2nd array, 2nd item, 2nd array
- How to implement:
	- Implement a fx responsible for merging 2 sorted arrays
		- Create empty array (don’t want to modify arg arrays passed in)
		- Use multiple pointers - one for each array
		- While i and j still have remaining values keep going
		- push smaller of 2 items into new array
		- once 1 array exhausted, just push remaining items from other array in
	- Implement merge sort function that:
		- recursively splits up unsorted array until list of 0-1 elements
		- calls merge helper to merge two sorted arrays back together

Helper function:
```js
/** Takes 2 sorted arrays 
* returns a new sorted array of combined elements 
*/

function merge(arr1, arr2) {
	let results = [];
	let i = 0;
	let j = 0;

	while (i < arr1.length && j < arr2.length){
		if (arr[i] < arr[j]) {
			results.push(arr[i]);
			i++;
		} else {
			results.push(arr[j]);
			j++;
		}
	}

	if (i < arr1.length) {
		results.push(...arr1.slice(i));
	} else if (j < arr2.length) {
		results.push(...arr2.slice(j));
	}

	return results;
}
```

mergeSort
```js
/** Takes an unsorted array
* splits array up recursively until arrays of just 0-1 item
* calls helper merge function to then merge 2 sides together and return sorted
* By nature of splitting and recursively calling left side first, splits up and then mergeSorts left side completely before splitting and mergeSorting right side, then merges left and right together in final call. 
*/

function mergeSort(arr){
	if (arr.length <= 1) return arr;

	const mid = Math.floor(arr.length/2);
	const left = mergeSort(arr.slice(0, mid));
	const right = mergeSort(arr.slice(mid));

	return merge(left, right);
}
```