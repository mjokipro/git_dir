const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruits = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// async function getLaunches() {
//     const res = await axios.get('https://api.spacexdata.com/v3/launches/upcoming');
//     renderLaunches(res.data);
// }



function handleEvent(e) {
    // const ul = document.querySelector('#');
    if (!e.target) return;
    e.preventDefault();

    let targs = e.target.value.toLowerCase();

    for (let targ of targs) {
        makeLi(targ);
    }
}

function makeLi(str) {
    // const newLi = document.createElement('LI');
    const newLi = document.createElement('LI');
        const arr = str.filter(v => fruits.includes(v));
        newLi.innerText = arr[0];
    
    newLi.classList.add('.has-suggestions');
        
    suggestions.append(newLi);
    // newLi.innerHTML += ` - ${launch.rocket.rocket_name}`;

}

input.addEventListener('keyup', handleEvent);