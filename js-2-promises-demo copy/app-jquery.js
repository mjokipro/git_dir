$.getJSON("https://pokeapi.co/api/v2/pokemon/")
  .then(pokemon => {
    console.log(`Gotta catch ${pokemon.count} pokemon.`);
  })
  .catch(err => {
    console.log(err);
  });
// end first jquery example

let baseURL = "https://pokeapi.co/api/v2/pokemon";

$.ajax(`${baseURL}/1/`, {
  success: p1 => {
    console.log(`The first pokemon is ${p1.name}`);
    $.ajax(`${baseURL}/2/`, {
      success: p2 => {
        console.log(`The second pokemon is ${p2.name}`);
        $.ajax(`${baseURL}/3/`, {
          success: p3 => {
            console.log(`The third pokemon is ${p3.name}`);
          },
          error: err => console.log(err)
        });
      },
      error: err => console.log(err)
    });
  },
  error: err => console.log(err)
});
// end callback hell example

$.ajax(`${baseURL}/1/`)
  .then(p1 => {
    console.log(`The first pokemon is ${p1.name}`);
    return $.ajax(`${baseURL}/2/`);
  })
  .then(p2 => {
    console.log(`The second pokemon is ${p2.name}`);
    return $.ajax(`${baseURL}/3/`);
  })
  .then(p3 => {
    console.log(`The third pokemon is ${p3.name}`);
  })
  .catch(err => console.log(err));
// end promise example

let fourPokemonPromises = [];

for (let i = 1; i < 5; i++) {
  fourPokemonPromises.push(
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${i}/`)
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
    $.getJSON(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}

Promise.race(fourPokemonRace)
  .then(pokemon => console.log(`${pokemon.name} won!`))
  .catch(err => console.log(err));
// end Promise.race example