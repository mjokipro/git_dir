const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function searchIn(input) {
	if (input.value == '') return [];

	var regEx = new RegExp(input.value);

	return fruits.filter(v => v.match(regEx));
}

function showResults(value) {
	suggestions.innerHTML = '';
	let newList = '';
	let results = searchIn(value);

	for (let i = 0; i < results.length; i++) {
		newList += '<li>' + results[i] + '</li>';
	}

	const lis = document.querySelectorAll('li');

	for (let i = 0; i < lis.length; i++) {
		lis[i].addEventListener('click', (e) => { 
			input.value = e.target.value;
		})	
	}

	suggestions.innerHTML = '<ul>' + newList + '</ul>';
}

// input.addEventListener('keyup', searchHandler);

// suggestions.addEventListener('click', (e) => {
// 	input.textContent = e.target.value;
// });