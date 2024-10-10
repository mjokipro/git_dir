let fourPokemonPromises = [];

for (let i = 1; i < 5; i++) {
  fourPokemonPromises.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}

Promise.all(fourPokemonPromises)
  .then(pokemonArr => {
    for (res of pokemonArr) {
      console.log(res.data.name)
    }
  })
  .catch(err => console.log(err));

// let fourPokemonRace = [];

// for (let i = 1; i < 5; i++) {
//   fourPokemonRace.push(
//     axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
//   );
// }

// Promise.race(fourPokemonRace)
//   .then(res => {
//     console.log(`${res.data.name} won the race!`)
//   })
//   .catch(err => console.log(err)) 
