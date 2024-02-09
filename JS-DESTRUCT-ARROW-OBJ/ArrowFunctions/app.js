// FUNCTION DECLARATION
// function greet() {
// 	console.log('HI!');
// }

// FUNCTION EXPRESSION
// const add = function(x, y) {
// 	return x + y;
// };

// FUNCTION EXPRESSION (passed as arg to map)
// array.map(function(x){
// 	return x * 2
// })

// Arrow functions only work as function expressions:
const add = (x, y) => {
	return x + y;
};

// Using a regular function expression:
[ 2, 3, 6, 78, 99, 104, 23 ].reduce(function(max, currNum) {
	return Math.max(max, currNum);
});

// Using an arrow function expression:
[ 2, 3, 6, 78, 99, 104, 23 ].reduce((max, currNum) => {
	return Math.max(max, currNum);
});

// *****************************
// ARROW FUNCTION "SHORTCUTS"
// *****************************

// [ 1, 2, 3, 4, 5 ].forEach(n => {
// 	console.log(n * 10);
// });

// const greet = () => {
// 	console.log('HELLO!!!');
// };

[ 1, 2, 3, 4, 5, 6 ].filter(function(num) {
	return num % 2 === 0;
});

[ 1, 2, 3, 4, 5, 6 ].filter((num) => num % 2 === 0);

const double = (n) => n * 2;

[ 1, 5, 7, 9, 10, 12, 13, 15 ].map((n) => {
	if (n % 2 === 0) {
		return 'even';
	}
	return 'odd';
});

// [ 1, 5, 7, 9, 10, 12, 13, 15 ].map((n) =>
// 	if (n % 2 === 0) {
// 		 'even';
// 	}
// 	 'odd';
// );
[ 1, 5, 7, 9, 10, 12, 13, 15 ].map((n) => (n % 2 === 0 ? 'even' : 'odd'));

const dailyRainTotals = [
	[ 1.2, 0.35, 2.2 ],
	[ 1.7, 0.6, 0.1 ],
	[ 2.5, 0.9, 1.5 ]
];
// dailyRainTotals.map((hourlyRainTotals) => {
// 	return hourlyRainTotals.reduce((sum, inchesOfRain) => {
// 		return sum + inchesOfRain;
// 	});
// });
dailyRainTotals.map((hourlyRainTotals) =>
	hourlyRainTotals.reduce((sum, inchesOfRain) => sum + inchesOfRain)
);

// const double = (n) => {
// 	return n * 2;
// };

// **********************
// Arrow Function Gotchas
// **********************
// const makeMath = (num) => {
// 	return {
// 		square : num * num,
// 		double : num * 2
// 	};
// };

// USE PARENS TO IMPLICITLY RETURN AN OBJECT:
const makeMath = (num) => ({
	square : num * num,
	double : num * 2
});

// THE KEYWORD 'THIS' BEHAVES DIFFERENTLY!
const cat = {
	name : 'Bubs',
	eat  : function() {
		console.log(this);
		return `${this.name} chows down`;
	},
	meow : () => {
		console.log(this);
		return `${this.name} says MEOW!!!`;
	}
};
