- Newer way of utilizing async without ‘callback hell’

## Constructor
- Promise constructor expects single argument, a function:
	- Okay to use arrow fx b/c not going to access `this`
```js
const myPromise = new Promise ((resolve, reject) => {
	// This function gets called right away
	// Define long running proecesses here: http requests, set timeout, etc.
	// Have access to two args: resolve & reject for success/failure of operation.
});
```

### Example
```js
const myPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve("This is the promise data");
		reject("This is the promise error");
	}, 2000);
});
```

## then
- `then` method on promise instances lets you define what you want to do when you actually have the data (upon resolve), or what you want to happen if it fails (upon reject).
- Takes two arguments, both functions:
	- First arg is function to execute upon resolve
	- Second arg is function to execute upon reject
- Note: This is very similar to [this](extracting-data#Example) example of callback approach in [[extracting-data]] 
- You can also chain `then` methods, allowing you to access the data for another use later, without having to send an additional request to fetch the data. 

### Example
```js
myPromise.then(
	(data) => {
	console.log(data); // Upon resolve, would print "This is the promise data"
}, (err) => {
	console.log(err); // Upon reject, would print "This is the promise error"
});


myPromise.then(
	(data) => {
	// Do something else with the data here upon resolve
}, (err) => {
	// Do something else with the data here upon reject
});
```

## Comparing Callback approach with Promises
- Callback: Depended on order, unclear if things going well or poorly
- Callback: possible to accidentally invoke multiple times
- Promises: easier to reason about
- Promises: impossible to run more than 1 of the functions, and only going to run once
- Often don’t know everything you’re going to do with data before sending for the data. Promises allow you to do this much easier, as you can chain `then` methods. 

## Passing resolve/reject multiple pieces of info
- If you want to pass multiple pieces of info with resolve and reject:
	- Put each of the pieces of info on an object
	- Then pass that object to resolve/reject as needed


## Promises with additional arguments
- Comparing Promises to the examples used with callbacks, where another piece of data (`wordCount`, `countryCode`) was provided in addition to the callback function when invoking the Higher Order Function - the current examples with Promises don’t show a way to include this info (as Promise constructor only takes 1 argument).
- Instead, define a function that <u>does</u> take arguments, and have this function <u>return</u> a Promise. 
```js
const getDataPromise = (data) => new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve(`This is the success data: ${data}`);
		reject(`This is the promise error`);
	}, 2000);
});

const myPromise = getDataPromise(123);
myPromise.then((data) => {
	console.log(data);  // Upon resolve, prints 'This is the success data: 123'
}, (err) => {
	console.log(err); // Upon reject, prints 'This is the promise error'
});
```
- ‘`data`‘ is accessible to the new Promise through [[closure]]




