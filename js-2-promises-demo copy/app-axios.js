// first promise
let url = "https://swapi.dev/api/planets/1/"
let ourFirstPromise = axios.get(url);
console.log(ourFirstPromise);
// Promise {<pending>}

// promise to be resolved (hopefully)
let validURL = "https://swapi.dev/api/people/1/";
let futureResolvedPromise = axios.get(validURL);

futureResolvedPromise
  .then(data => console.log(data))
  .catch(err => console.log(err));

// promise to be rejected
let invalidURL = "https://swapi.dev/api/tacos/1/";
let futureRejectedPromise = axios.get(invalidURL);

futureRejectedPromise
  .then(data => console.log(data))
  .catch(err => console.log(err));

// promise chaining with pokemon api
let baseURL = "https://pokeapi.co/api/v2/pokemon";

axios
  .get(`${baseURL}/1/`)
  .then(p1 => {
    console.log(`The first pokemon is ${p1.data.name}`);
    return axios.get(`${baseURL}/2/`);
  })
  .then(p2 => {
    console.log(`The second pokemon is ${p2.data.name}`);
    return axios.get(`${baseURL}/3/`);
  })
  .then(p3 => {
    console.log(`The third pokemon is ${p3.data.name}`);
  })
  .catch(err => {
    console.log(`Oops, there was a problem :( ${err}`);
  });

  // end promise chaining example

let fourPokemonPromises = [];

for (let i = 1; i < 5; i++) {
  fourPokemonPromises.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}

Promise.all(fourPokemonPromises)
  .then(pokemonArr => (
    pokemonArr.forEach(p => console.log(p.name))
  ))
  .catch(err => console.log(err));
// end Promise.all example

let fourPokemonRace = [];

for (let i = 1; i < 5; i++) {
  fourPokemonRace.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}

Promise.race(fourPokemonRace)
  .then(pokemon => console.log(`${pokemon.name} won!`))
  .catch(err => console.log(err));
// end Promise.race example