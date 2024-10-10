// async function getData() {
//   const response = await axios.get('https://swapi.dev/api/planets/');
//   const { next, results } = response.data;
//   for (let planet of results) {
//     console.log(planet.name)
//   }
//   const response2 = await axios.get(next);
//   const results2 = response2.data.results;
//   for (let planet of results2) {
//     console.log(planet.name)
//   }
// }

// getData();
// console.log("I HAPPEN AFTER getData()")

async function getLaunches() {
  const res = await axios.get('https://api.spacexdata.com/v3/launches/upcoming');
  renderLaunches(res.data);
}

function renderLaunches(launches) {
  const ul = document.querySelector("#launches");
  for (let launch of launches) {
    ul.append(makeLaunchLI(launch))
  }
}

function makeLaunchLI(launch) {
  const newLI = document.createElement('LI');
  const mission = document.createElement('B');
  mission.innerText = launch.mission_name;
  newLI.append(mission);
  newLI.innerHTML += ` - ${launch.rocket.rocket_name}`
  return newLI;
}

const btn = document.querySelector('#getLaunches');
btn.addEventListener('click', getLaunches);
