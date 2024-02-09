// const add = (x, y) => x + y;
// const mult = (x, y) => x * y;
// const square = (x) => x * x;
// const power = (x, y) => x ** y;

// const myMath = {};
// myMath.add = add;
// myMath.mult = mult;

// const myMath = { add, mult, square, power };

// const myMath = {
// 	add  : function(x, y) {
// 		return x + y;
// 	},
// 	mult : (x, y) => {
// 		return x * y;
// 	}
// };

const myMath = {
	add(x, y) {
		return x + y;
	},
	square(x) {
		return x * x;
	}
};
