- Variables can only start with a-z characters, $ or __
- No symbols besides $ or __  in variable names
- Global scope - Defined outside of all code blocks
- Local scope - Defined inside of a code block

### Variable shadowing: 
	- When a variable's local scope uses it's value instead of a variable in a parent's scope.
``` js
// Global (name)
	// Local (name)
		// Local
	// Local

let name = "Andrew";
if (true){
	let name = "Mike";

	if (true){
		console.log(name); // Prints "Mike" to console
		name = "Jen";
		console.log(name); // Prints "Jen" to console
	}
}
if (true){
	console.log(name); // Prints "Andrew" to console b/c first name found is in parent scope
}
```

### Leaked Global: 
	- When variable is never officially defined (using let/const/var), Javascript looks for it, and when it gets to global and doesn't find it, it defines it in global memory. 
 ``` js
// Global 
	// Local 
		// Local
	// Local

// let name = "Andrew";
if (true){
	// let name = "Mike";

	if (true){
		name = "Jen"; // No error thrown for this!
		console.log(name); // STILL!! Prints "Jen" to console
	}
}
if (true){
	console.log(name); // Prints "Jen" to console!!
}
```
	- Avoid this by making sure to declare all variables using let/const!

### Null & Undefined
	- Undefined used as Javascript language default for unassigned variables. Happens when:
		- return value of a function not defined
		- if a variable is declared but not assigned a value
			- example: let name;
		- if a function parameter did not have an argument passed in, it is assigned the value of undefined
	- Let's say a user refreshes a page, we may want to "reset" variables so they no longer have the values previously assigned to them. In this case, we could assign it the value of undefined, but then we wouldn't know if that variable was explicitly assigned that value, or if it was one of the cases, like above, where Javascript automatically assigned it for us. 
	- Null is useful for knowing that "no value" was explicitly assigned. i.e. if you are explicitly stating a variable and want it to have "no value" (like in a reset), assign it the value of null, so it is clear that this happend intentionally. 

### Why is Var bad?
- Var lets you reassign variables that have already been assigned
	```js
	var age = 10;
	console.log(age);
	var age = 15; // No error is thrown here to let you know it has already been assigned
```
- Var is function scoped instead of block scoped
	```js
	if (true){
		var name = "Alyssa";
	}
	console.log(name); // Prints Alyssa
```
	This is a problem because these variables then cloud up global memory space, and you have to be careful use different variable names. 
	
- With Var, variable declaration gets hoisted to the top of the code, but the assignment does not, so this code:
	```js
	console.log(age);  // logs undefined, no error msg
	var age = 10;
```
	actually ends up running like this:
	```js
	var age;
	console.log(age);  // still logs undefined, b/c variable declared but not assigned a value until next line.
	age = 10;
```
	Another example:
	```js
	age = 10;
	console.log(age); // Prints 10
	var age;
```
	Actually ends up running like this b/c hoisting declaration:
	```js
	var age;
	age = 10;
	console.log(age);
```
