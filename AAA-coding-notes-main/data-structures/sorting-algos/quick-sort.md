
---
date: 2023-04-26
metadata: true
concepts: ['sort', 'data-structures', 'recursion', 'comparison']
status: 'pre-lecture'
docs: 
cite: ['udemy-data-structures']
---

## Quick sort

- Complexities
	- Time Complexity
		- `O(n^2`   worst - O(n^2), average and best - O(nlogn)
			- –> as n grows, generally need logn decompositions
				- but in worst case, this is n decompositions
					- worst case is choosing a pivot that shifts only 1 number
			- –> as n grows in worst case, need  n comparisions
				- if pivot only shifts 1 item each time, choosing 1st item as pivot and passing in an already-sorted array
			- Can minimize worst case times and improve time it takes by:
				- choosing a random number to pivot on
				- choosing middle number
				- –> choosing first element or last element  risks the n^2 time if a sorted array is passed in.
	- Space Complexity
		- `O(logn)`
- How it works
	- splits up until 0-1 elements
	- selects a *pivot* point
	- moves all numbers lower than that number to left, all greater to right (still unsorted)
		- So you know the index of that one element is sorted
	- then repeats for left and right sides, recursively
- How to implement
	- Implement pivot helper function :
		- Takes an unsorted array, start index (default 0), end index(default length - 1)
		- Chooses a pivot point element and keeps track of current index
			- ideally would be middle
			- different strategies: choosing first element, randomly, middle, etc.
		- Rearranges the elements *in place* to before/after the pivot point
			- loop through array from start to end
				- if pivot greater than current element, increment pivot index variable, then swap current element and the element at that index
			- swap starting element with element at pivot index
			- return pivot index
		- Returns the *index* of the pivot point element

pivot helper
```js
/** pivot (may also be called partition)
* Accepts unsorted array, start index, end index
* Sorts array in place at pivot point
* Returns index of pivot element
*/

function pivot (arr, start, end){
	let pivotIdx = start;  // choice here to use 1st element as pivot

	for (let i=start + 1; i < end; i++){
		if (arr[pivotIdx] > arr[i]){
			pivotIdx++;
			[arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
		}
	}

	[arr[start], arr[pivotIdx]] = [arr[pivotIdx], arr[start]];

	return pivotIdx;
}
```

quickSort
```js
/** Function quickSort
* Accepts unsorted array, left index(start), right index(end)
* Returns sorted array
*/

function quickSort(arr, left=0, right=arr.length-1){
	if (right <=left) return arr;
	
	let pivotIdx = pivot(arr, left, right);

	let leftSide = quickSort(arr, left, pivotIdx-1);
	let rightSide = quickSort(arr, pivotIdx+1, right);
}
```