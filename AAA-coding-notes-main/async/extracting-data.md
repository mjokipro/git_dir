- When working with data received from an HTTP request - it will not work to use the data in a typical javascript function through either:
	- return data from the parent function that exists in the inner/child async callback function on event listener (WONT WORK)
	- initializing a variable, updating the variable with the returned async data, and then doing something with that data (WONT WORK)
### Steps
- Instead, need to utilize callbacks to extract this data
	- Define a Higher Order function that takes TWO functions as arguments (one to be invoked upon error, one to be invoked upon success)
		- Within this HOF:
			- Create your XMLHttpRequest
			- Define your event listener
				- Include your conditional for  `e.target.readyState ===4`  and    `e.target.status === 200`
					- Within this conditional, you can parse returned JSON data
					- And then invoke the success callback passed into the HOF
				- Else if,  `e.target.readyState === 4`, but any other status is returned
					- Invoke the error callback
			- Open your request
			- Send your request
### Example
- Example of an HOF to extract async data:
```js
const newPuzzle = (wordCount, error, success) => {
	const request = new XMLHttpRequest();
	
	request.addEventListener("readystatechange", (e) => {
		if (e.target.readyState === 4 && e.target.status === 200) {
			const data = JSON.parse(e.target.responseText);
			success(data.puzzle); // Invoking of 2nd arg callback 
		} else if (e.target.readyState === 4) {
			const errorMsg = e.target.status + " " + e.target.statusText;
			error(errorMsg); // Invoking of 1st arg callback
		}
	});
	
	request.open("GET", `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`);
	request.send();

};
```
- Example invocation of the HOF:
```js
newPuzzle("2", 
	(code) => {
		console.log("Error: ", code); // Defining what to do upon error
	}, 
	(puzzle) => {
		console.log(puzzle);        // Defining what to do upon success
	}
);
```

### Alternative Example

- Alternatively, you can use a HOF that takes just <u>ONE</u> callback (callback takes TWO args instead)
```js
const getCountry = (code, callback) => {
	const countryRequest = new XMLHttpRequest();
	
	countryRequest.addEventListener("readystatechange", (e) => {
		if (e.target.readyState === 4 && e.target.status === 200) {
			const countryData = JSON.parse(e.target.responseText);
			const myCountry = countryData.find((obj) => obj.cca2 === code);
			const myCountryName = myCountry.name.official;
			callback(undefined, myCountryName);
		} else if (e.target.readyState === 4) {
			const errorMsg = `${e.target.status}: ${e.target.statusText}`;
			callback(errorMsg);
		}
	});
	
	countryRequest.open("GET", "https://restcountries.com/v3.1/all");
	countryRequest.send();
}
```

- Invoking the alternative HOF with ONE callback (callback takes TWO args)
```js
getCountry("US", (error, success) => {
	if (error) {
		console.log(error);  // Defining what to do upon error
	} else {
		console.log(success); // Defining what to do upon success
	}
});
```

### Summary
- HOF: Worries about getting the data. In these examples, gets data asynchronously
- Callback/invokation: Doesn’t care about where data came from, just does something with that data (usually? more synchronously)
- In both exampes, the event listener function is invoked after the HOF (`newPuzzle `and `getCountry`) has completed.  In both of these cases, the event listener function has access to the callback function(s) and variables like ‘wordCount’ and ‘code’ because of [[closure]].