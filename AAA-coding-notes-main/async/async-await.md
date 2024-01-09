- When you create a function you can choose to create a function as an async function, using the `async` keyword
- & Async functions <u>always, always</u> return a promise
	- The value that is returned from an async function is the value that is resolved from that promise.
```js
const processData = async () => {
	return 12;
};

console.log(processData()); // Promise { 12 }

processData()
	.then((data) => {
		console.log(data);  // 12
	})
	.catch((error) => {
		console.log(error);
	});
```

## await
- await can only be used with an async function - that is why it is usually always referred to as async-await, becuase if you are using one, you’re most likely using the other. 
	- % Note: Normally, you can’t use await when you’re not in an async function. However, as a special case, many web browsers (including Chrome) allow you to do so only if you enter that line in the console directly.
- `await` is the one keyword that determines if the function *needs* to be asynchronous. 
-  we would have to use promises & promise chaining to access the data that returned from promises, like this:
```js
const getDataPromise = (num) => new Promise((resolve, reject) => {
	setTimeout(() => {
		typeof num === 'number' ? resolve(num * 2) : reject('Number must be provided')
	}, 2000);
})

const processData = () {
	return getDataPromise(2).then((data) => {
		console.log(data); // Or do something else with the data here
	})
}

processData().then((data) => {
	console.log(data);
}).catch((error) => {
	console.log(error);
})
```
- But with async-await, the code looks almost synchronous, with the asynchronouse pieces abstracted away:
	- No longer have to add `.then()` with a callback function, can just save the value that returns from await directly into a variable.
	- await will also throw an error automatically if the promise is rejected
		- So in this example, if a string is passed to getDataPromise, triggering it’s ‘reject’ sequence, await automatically throws an error that triggers the `catch()` sequence on processData()
```js
const getDataPromise = (num) => new Promise((resolve, reject) => {
	setTimeout(() => {
		typeof num === 'number' ? resolve(num * 2) : reject('Number must be provided')
	}, 2000);
})

const processData = async () => {
	let data = await getDataPromise(2); // data = 4
	data = await getDataPromise(data);  // data = 8
	return data;
}

processData().then((data) => {
	console.log(data);  // Would expect data = 8
}).catch((error) => {
	console.log(error);
})
```

## Example:
- Example from more real-world hangman puzzle project
- Async function definition:
```js
const newPuzzle = async (wordCount) => {
	const response = await fetch(
		`https://puzzle.mead.io/puzzle?wordCount=${wordCount}`,
		{}
	);
	if (response.status === 200) {
		const data = await response.json();
		return data.puzzle;
	} else {
		throw new Error("Unable to fetch data");
	}
};
```
- Invocation:
```js
newPuzzle("2")
	.then((puzzle) => {
		console.log(puzzle);
	})
	.catch((err) => {
		console.log("Error: ", err);
});
```

## Rithm Examples

### Airline example
- Note chain of async functions below
	- If you care about what you are returning from your async function, must access that data from another async function becuase you have to ‘await’ the results.
	- But, if you have a controller function where you don’t care what that function returns, you can just call that function somewhere else.
```js
async function getAirlineInfo() {
  // await ajax-to-delta
  // return response.data
}

async function getHotel() {
  // await ajax-to-hilton
  return response.data;
}

async function getCost() {
  const airCost = await getAirlineInfo();
  const hotelCost = await getHotel();
  return airCost + hotelCost;
}

async function makeItin() {
  const totalCost = await getCost();
  $("#info").html(totalCost);
}

$("button").on("click", makeItin);
```

### Show hand example
- In this example, the return of getHand() doesn’t matter, since the info is being updated directly to the DOM
- Inside of getHand(), it is calling the synchronous function showHand() that is updating the DOM
```js
/* show result of hand in box */
function showHand(hand) {
	let $box = $("#hand");
	$box.empty();
	
	for (let {rank, suit} of hand) {
		let t = `<p>${rank} of ${suit}</p>`;
		$box.append($(t));
	}
}

async function getHand() {
	let ncards = Number($("#ncards").val());
	
	let response = await axios.get(
		"/api/hand", { params: { ncards } });
	
	console.log("getHand resp=", response);
	showHand(response.data.hand);
}

$("#hand-btn").on("click", getHand);
```
- & TAKEAWAYS: 
- & If you need to access the returned data from an async function, must use await, and therefore must be within an async function
- & You can call and use synchronous functions as needed and useful to you in async functions the same as in regular functions.


## When not to await
- You don’t need to await something if you are just going to return it.
- So this code:
```js
const getCurrentCountry = async () => {
	const location = await getLocation();
	const country = await getCountry(location.country);
	return country;
};
```
- Is exactly the same as this code:
```js
const getCurrentCountry = async () => {
	const location = await getLocation();
	return getCountry(location.country);
};
```


