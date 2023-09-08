const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	let results = [];
	if (str) {
		results.filter(v => v.toLowerCase().includes(str));
	}
	return results;

}

function searchHandler(e) {
	e.preventDefault();
	let inputVal = e.target.value.toLowerCase();
	console.log(inputVal);
	let results = search(inputVal);
	showSuggestions(results,);
}

function showSuggestions(results,) {
	
	let newArr = results.map(v => v = `<li>${v}</li>`);
	suggestions.append(newArr);
}


	

	// if (!inputVal) suggestions.innerHTML = '';

	// suggestions.innerHTML = newArr;
	// suggestions.append(li);



function useSuggestion(e) {
	e.preventDefault();
	// input.value = e.target;
	//  suggestions.innerHTML = e.target.value;
	// input.value = e.target.value;
}

input.addEventListener('keyup', searchHandler);

// suggestions.addEventListener('click', useSuggestion);