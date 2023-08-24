const colors = [ 'teal', 'cyan', 'peach', 'purple' ];

function yell(val, i) {
	const caps = val.toUpperCase();
	console.log(`At index ${i}, ${caps}`);
}

colors.forEach(yell);

const prices = [ 30.99, 19.99, 2.5, 99.0 ];
let total1 = 0;
prices.forEach(function(price) {
	total1 += price;
});
console.log(total1);

let total2 = 0;
for (let price of prices) {
	total2 += price;
}
console.log(total2);

// Our own version of forEach:
function forEach(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		callback(arr[i], i, arr);
	}
}

forEach(colors, function(color, i) {
	console.log(color.toUpperCase(), 'at index of:', i);
});

colors.forEach(function(color, i) {
	console.log(color.toUpperCase(), 'at index of:', i);
});
