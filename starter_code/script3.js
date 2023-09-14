// THIS CODE WORKS AS IS...JUST COPY AND PASTE INTO script.js !!!

const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	if (!str) return [];

	let regEx = new RegExp(str);
	return fruits.filter(v => {
		if (v.match(regEx)) return v;
	})
}

function searchHandler(e) {
	let targ = e.target.value.toLowerCase();
	if (!targ) return;
	e.preventDefault();
	let sResult = search(targ);
	showSuggestions(sResult, targ);
}

function showSuggestions(results, inputVal) {	

	// suggestions.innerHTML = '';
	suggestions.innerHTML = results.map(v => v);
	if (results.includes(inputVal)) {
		
	}
}

function useSuggestion(e) {
	if (!e.target) return;
	e.preventDefault();

	input.value = e.target.innerText;
	console.log(input.value);
}

input.addEventListener('keyup', searchHandler);

suggestions.addEventListener('click', useSuggestion);