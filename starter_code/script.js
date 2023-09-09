const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	return str.toLowerCase().split('')
		.filter(v => fruits.indexOf(v) === -1).join('');
}

function searchHandler(e) {
	e.preventDefault();
	let targ = e.target.value;
	if (!targ) return;
	let sResult = search(targ);
	showSuggestions(sResult, targ);
}

function showSuggestions(results, inputVal) {
	// console.log(inputVal);
	for (let result of results) {
		let li = document.createElement('li');
		li.innerHTML = `<li>${result}</li>`;
		suggestions.appendChild(li);
		// suggestions.append(li);
	}
	
	// li.innerHTML = results.map(v => v);
		// results.filter(v => v === inputVal)[0];
	// suggestions.innerHTML = results.map(v => v);
	
}

function useSuggestion(e) {
	// TODO
}

input.addEventListener('keyup', searchHandler);

// suggestions.addEventListener('click', useSuggestion);