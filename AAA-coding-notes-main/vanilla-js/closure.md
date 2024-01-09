- A closure is combo of a function with the lexical scope in which it was defined
- Useful in many situations:
	- Allowing variable access to [Async event listeners](../async/extracting-data#Summary)
	- [Private variables](#private-variables), with and without [[currying]]


## private-variables
- Closure protects variable from manipulation in ways other than the specified methods.
```js
const createCounter = () => {
	let count = 0;
	
	return {
		increment() {
			count++;
		},
		decrement() {
			count--;
		},
		get() {
			return count;
		},
	};
};

const counter = createCounter();
counter.increment();
counter.decrement();
counter.decrement();
console.log(counter.get()); // -1

counter.count = 0;  // DOES NOT WORK
console.log(counter.get()); // -1
```
