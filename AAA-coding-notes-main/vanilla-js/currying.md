- Currying refers to a process of transforming a single function that takes a lot of arguments to multiple functions that takes a subset of those arguments

- Standard function version:
```js
const add = (a, b) => a + b;
```
- Curried function version:
```js
const createAdder = (a) => {
	return (b) => {
		return a + b;
	}
}

const add10 = createAdder(10);
console.log(add10(-2));
console.log(add10(20));

const add100 = createAdder(100);
console.log(add100(-90));
```
- This example also uses [[closure]] 

