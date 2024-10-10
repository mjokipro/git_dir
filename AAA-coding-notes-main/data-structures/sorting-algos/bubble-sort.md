
---
date: 2023-05-24
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

- Bubble Sort
	- Performs better on *almost sorted data* than other algos that are otherwise “better sorting algos”
	- Largest values “bubble up” to the top with each pass
	- https://visualgo.net/en/sorting

one way - worst case O(n^2)
```js

function bubbleSort(arr) {
	const swap (arr, idx1, idx2) => {
		[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]]
	};

	for (let i = arr.length; i > 0; i--) {
		for (let j=0; j < i -1; j++) {
			if (arr[j] > arr[j+1]){
				swap(arr, j, j+1);
			}
		}
	}
	return arr;
}
```


better way - worst case O(n)
```js
function bubbleSortOptimized(arr){
	let noSwaps;
	for(let i = arr.length; i > 0; i--){
		noSwaps = true;
		for (let j=0; j< i -1; j++) {
			if(arr[j] > arr[j+1]){
				let temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
				noSwaps = false;
			}
		}
		if(noSwaps) break;
	}
	return arr;
}
```