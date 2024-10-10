// async function getData() {
//     const response = await axios.get('https://swapi.dev/api/planets/');
//     const { next, results } = response.data;
//     console.log(next);
    
//     const arr = [];

//     for (let planet of results) {
//         arr.push(planet.name);
//     }
//     const response2 = await axios.get(next);
//     const results2 = response2.data.results;
//      for (let planet of results2) {
//         arr.push(planet.name);
//     }
// }

// getData();

async function getLaunches() {
    const res = await axios.get('https://api.spacexdata.com/v3/launches/upcoming');
    renderLaunches(res.data);
}

function renderLaunches(launches) {
    const ul = document.querySelector('#launches');
    for (let launch of launches) {
        ul.append(makeLaunchLi(launch));
    }
}

function makeLaunchLi(launch) {
    const newLi = document.createElement('LI');
    const mission = document.createElement('B')
        .innerText = launch.mission_name;
        
    newLi.append(mission);
    newLi.innerHTML += ` - ${launch.rocket.rocket_name}`;
    return newLi;
}

const btn = document.querySelector('#getLaunches');
btn.addEventListener('click', getLaunches);