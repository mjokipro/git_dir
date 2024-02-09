function sum() {
	const args = Array.from(arguments);
	return args.reduce((sum, val) => {
		return sum + val;
	});
}
sum(4, 5, 6); //15
sum(98, 23, 1, 2, 1, 1, 1, 1, 1); //129

// NO ARGUMENTS OBJECT IN ARROW FUNCTIONS!
// const max = () => {
// 	console.log(arguments);
// };

const max = function() {
	const args = Array.from(arguments);
	return args.reduce((max, currVal) => {
		return currVal > max ? currVal : max;
	});
};
