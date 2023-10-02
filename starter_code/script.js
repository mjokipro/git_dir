// create var for input text, and ul to append to
const input = document.querySelector('#fruit');
const $suggestions = document.querySelector('.suggestions ul');
let div = document.getElementsByClassName('.suggestions');
$(".suggestions").hide();

// suggestions list
const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// input string, if none return, else create new regex, 
// and return array
function search(str) {
	console.debug("search(str)")
	
	if (str) $(".suggestions").show();

	// create regular expression with input str
	let regEx = new RegExp(str);

	// Debugger
	print(regEx)

	// filter each value, if value is in regex, 
	// return value to new array
	return fruits.filter(v => {
		return v.toLowerCase().match(regEx);
	})
}


// handles keyup events; check for undefined
function searchHandler(e) {
	console.debug("searchHandler(e)")

	// prevent default so input value doesn't disappear
	e.preventDefault();

	// set target value 'keyup' value to lowercase
	let targ = e.target.value.toLowerCase();
	if (!targ) $(".suggestions").hide();
;


	// run search(targ) func, sending lowercase input value
	// to search(str), and store returned array 
	// of filtered fruits by input val in sResult
	let sResult = search(targ);
	// if(!sResult) $(".suggestions").reset();
	// call showSuggestions(), send sResult (arr) and targ
	showSuggestions(sResult, targ);
}

// this function displays suggestions based on input;
// creates list element, and append to .suggestions ul
function showSuggestions(results, inputVal) {
	$suggestions.innerHTML = '';

// check for elements in results (arr), and if element(s)...
	if (results.length > 0) {

// loop through results (arr)
		for (let i = 0; i < results.length; i++) {

			// create alias for each element in results
			let result = results[i];

			// check and repeat for each char in regex:
			// result contains input value, extract to val
			const val = result.match(new RegExp(inputVal, 'i'));

			// for each result, replace original val in results (arr)
			// with bold letters to show in suggestions list
			result = result.replace(val[0], `<strong>${val[0]}</strong>`);

			// create li, encase result, append to suggestions (ul)
			$suggestions.innerHTML += `<li>${result}</li>`;
		}

		// add class 'has-suggestions' for css
		$suggestions.classList.add('has-suggestions');

		// if no elems in results, reset variables
	} else {
		results = [];
		$suggestions.innerHTML = '';
		$suggestions.classList.remove('has-suggestions');
	}
}

function print(item) {
	console.log(`Printing... ${item}`)
}

// click handler for when user clicks on suggestion from 
// list, captures text from target, 
function useSuggestion(e) {
	if (!e.target) return;
	e.preventDefault();

	// display clicked suggestion in input field
	input.value = e.target.innerText;

	// remove suggestions list and class
	$suggestions.innerHTML = '';
	$suggestions.classList.remove('has-suggestions');

	// hide ul dropdown when input present in box
	if (input.value) {
    	$(".suggestions").hide();
    	input.focus();
  	}
}

// set input text box to 'listen out' for key presses, and 
// when they occur, call searchHandler callback function
input.addEventListener('keyup', searchHandler);

// set suggestions ul container to 'listen out' for
// mouse click events, and when they occur, call useSuggestion
// callback function
$suggestions.addEventListener('click', useSuggestion);