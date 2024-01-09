## fetch
- Newer way of making requests using fetch API
	- 1st arg is the URL (similar to `.open` method on [HTTP requests](XMLHttpRequest.md) )
	- 2nd arg is optional, allows selection of options
```js
fetch('http://puzzle.mead.io/puzzle', {}).then((response) => {
	// No longer need to worry about readyState here, but do need to figure out how things went - alternative status' don't auto show as an error, but an error can be manually triggered
	if (response.status === 200) {
		return response.json();  // .json method actually returns a *promise*, which eventually resolves with the expected js object in the future. Returning the json promise here uses Promise chaining, which then allows us to chain on another 'then' method below
	} else {
		throw new Error('Unable to fetch puzzle'); // Manual error - will run catch.
	}
}).then((data) => {
	console.log(data.puzzle);
}).catch((error) => {
	console.log(error);
});
```

- <u>Note 1:</u> Do not have to worry about `readyState` with Promises, because they are only going to resolve or reject once it is ready.
- <u>Note 2:</u> On response, we have access to a method `json`. `json` method takes the response body and parses it as JSON.  (could theoretically do the same thing for the error handling). `json` method actually <u>returns a promise</u>, (<u>not a js object</u>). This promise eventually resoves with the js object at some point in the future.
	- This is where [promise chaining ](promise-chaining) comes in
	- Returning the `json` promise here allows us to chain on an additional `then` method
- <u>Note 3: </u>Manually throwing an error in a promise triggers the `catch`  error handler

### Example
- Function definition: 
```js
const newPuzzle = (wordCount) => {
	return fetch(`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`, {})
	.then((response) => {
		if (response.status === 200) {
			return response.json();
		} else {
			throw new Error("Unable to fetch data");
		}
	});
};
```
- Function invocation:
```js
newPuzzle("2").then((data) => {
	console.log(data.puzzle);  // data is object, accessing puzzle prop
}).catch((err) => {
	console.log("Error: ", err);
});
```
- Why can I add `then` method to what comes back from newPuzzle(“2”)? Because what comes back from getDataPromise is everything that is returned from the function definition of newPuzzle (`fetch` and everything after).

### Use-of-then-with-other-data
- Note that `.then()` need not always return a promise, or be passed one, if it is within a promise chain. 
- See section within [promise chaining](promise-chaining#Returning-other-data-with-then) for an example of this. 