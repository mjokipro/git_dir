const words = [
	'immunoelectrophoretically',
	'rotavator',
	'tsktsk',
	'psychophysicotherapeutics',
	'squirrelled',
	'crypt',
	'uncopyrightable',
	'cysts',
	'pseudopseudohypoparathyroidism',
	'unimaginatively'
];

words.some(function(word) {
	return word.length > 25;
});

words.some(function(word) {
	return word.indexOf('thyroid') !== -1;
});

words.every(function(w) {
	return w.length >= 5;
});

function allStrings(arr) {
	return arr.every(function(el) {
		return typeof el === 'string';
	});
}

const btn = document.querySelector('button');
btn.addEventListener('click', function(e) {
	const checkboxes = document.querySelectorAll('input[type="checkbox"]');
	const allChecked = Array.from(checkboxes).every(function(checkbox) {
		return checkbox.checked;
	});
	if (!allChecked) alert('PLEASE AGREE TO EVERYTHING!');
});

function mySome(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		if (callback(arr[i], i, arr)) return true;
	}
	return false;
}

mySome([ 4, 5, 6, 7 ], function(n) {
	return n > 5;
});

function myEvery(arr, callback) {
	for (let i = 0; i < arr.length; i++) {
		if (!callback(arr[i], i, arr)) return false;
	}
	return true;
}

myEvery([ 4, 5, 6, 7 ], function(n) {
	return n > 5;
});

myEvery([ 4, 5, 6, 7 ], function(n) {
	return Number.isInteger(n);
});
