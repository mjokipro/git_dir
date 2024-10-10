function sing() {
	if (true) {
		var song = 'Goodbye Yellow Brick Road';
		console.log(song); //var is scoped to the function
	}
	console.log(song); //we have access to song here too
}

// Let variables are block scoped
if (true) {
	let color = 'teal';
	console.log(color);
}
// console.log(color);  //THIS WILL NOT WORK!

// **********************
// For Loop Example:
// **********************

// Using VAR...
// var i = 'hello';
// for (var i = 0; i <= 3; i++) {
// 	console.log(i);
// } //i will persist outside this loop
// console.log(i);

// Using LET...
let i = 'hello';
for (let i = 0; i <= 3; i++) {
	console.log(i);
} //the loop's i variable only exist IN THE LOOP
console.log(i); //'hello'

let mood = 'fantastic';
function getMood(num) {
	let mood = 'meh';
	if (num < 3) {
		let mood = 'bad :(';
		console.log(mood);
	}
	return mood;
}
getMood(2); //"meh"

// CONST is also block-scoped
const PI = 3.14159; //this const is not the same as...
if (true) {
	const PI = 4.561234; // ...this const
	console.log(PI);
}
console.log(PI);

// *********************
// VARIABLE HOISTING!
// *********************

// This will print undefined...wtf?
console.log(chickens); //undefined
var chickens = [ 'butters', 'nancy', 'junior', 'tilda', 'stevie chicks' ];
//The declaration is run BEFORE anything else.

// let and const DO NOT work this way.
// This code results in an error:

// console.log(chickens);
// const chickens = [ 'butters', 'nancy', 'junior', 'tilda', 'stevie chicks' ];
// console.log(chickens);
