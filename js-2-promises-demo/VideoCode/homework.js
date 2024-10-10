let baseURL = "http://numbersapi.com";
let deckURL = "https://deckofcardsapi.com/api/deck"
let drawURL = "https://deckofcardsapi.com/api/deck"
let favNumber = 5
// /<<deck_id>>/draw/?count=2
// /?deck_count=1
let baseURL3 = "https://pokeapi.co/api/v2"
$(function() {
    let baseURL = "https://pokeapi.co/api/v2";
  
    // 1.
    $.getJSON(`${baseURL}/pokemon/?limit=1000`).then(data => {
      console.log(data);
    });
  
    // 2.
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
      .then(data => {
        let randomPokemonUrls = [];
        for (let i = 0; i < 3; i++) {
          let randomIdx = Math.floor(Math.random() * data.results.length);
          let url = data.results.splice(randomIdx, 1)[0].url;
          randomPokemonUrls.push(url);
        }
        return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
      })
      .then(pokemon => {
        pokemon.forEach(p => console.log(p));
      });
  
    // 3.
    let names = null;
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
      .then(data => {
        let randomPokemonUrls = [];
        for (let i = 0; i < 3; i++) {
          let randomIdx = Math.floor(Math.random() * data.results.length);
          let url = data.results.splice(randomIdx, 1)[0].url;
          randomPokemonUrls.push(url);
        }
        return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
      })
      .then(data => {
        names = data.map(d => d.name);
        return Promise.all(data.map(d => $.getJSON(d.species.url)))
      })
      .then(data => {
        let descriptions = data.map(d => {
          let descriptionObj = d.flavor_text_entries.find(
            entry => entry.language.name === "en"
          );
          return descriptionObj ? descriptionObj.flavor_text : "No description available."; 
        });
        descriptions.forEach((desc, i) => {
          console.log(`${names[i]}: ${desc}`);
        });
      });
  
    // 4.
    let $btn = $("button");
    let $pokeArea = $("#pokemon-area");
  
    $btn.on("click", function() {
      $pokeArea.empty();
      let namesAndImages = [];
      $.getJSON(`${baseURL}/pokemon/?limit=1000`)
        .then(data => {
          let randomPokemonUrls = [];
          for (let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * data.results.length);
            let url = data.results.splice(randomIdx, 1)[0].url;
            randomPokemonUrls.push(url);
          }
          return Promise.all(randomPokemonUrls.map(url => $.getJSON(url)));
        })
        .then(pokemonData => {
          namesAndImages = pokemonData.map(p => ({
            name: p.name,
            imgSrc: p.sprites.front_default
          }));
          return Promise.all(pokemonData.map(p => $.getJSON(p.species.url)));
        })
        .then(speciesData => {
          speciesData.forEach((d, i) => {
            let descriptionObj = d.flavor_text_entries.find(function(entry) {
              return entry.language.name === "en";
            });
            let description = descriptionObj ? descriptionObj.flavor_text : "";
            let { name, imgSrc } = namesAndImages[i];
            $pokeArea.append(makePokeCard(name, imgSrc, description));
          });
        });
    });
  
    function makePokeCard(name, imgSrc, description) {
      return `
        <div class="card">
          <h1>${name}</h1>
          <img src=${imgSrc} />
          <p>${description}</p>
        </div>
      `;
    }
  });

// $(function(){
//     const baseURL3 = "https://pokeapi.co/api/v2/"
//     $.getJSON(`${baseURL}`, function(data) {
//         console.log(data)
//     })
// });


let fun = $(function() {
    let baseURL2 = 'https://deckofcardsapi.com/api/deck';
  
    
    $.getJSON(`${baseURL2}/new/draw/`, function(data) {
      let { suit, value } = data.cards[0];
      console.log(`YOU GOT...${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  
    
    $.getJSON(`${baseURL2}/new/draw/`, function(data) {
      let firstCard = data.cards[0];
      let deckId = data.deck_id;
      $.getJSON(`${baseURL2}/${deckId}/draw/`, function(data) {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
          console.log(
            `YOU GOT...${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
          );
        });
      });
    });
})

let firstCard = null;

$.getJSON(`${deckURL}/new/draw/`)
.then(data => {
    firstCard = data.cards[0]
    let deckId = data.deck_id;
    return $.getJSON(`${ deckURL }/${ deckId }/draw/`)
})
.then(data => {
    let second = data.cards[0];
    [firstCard, second].forEach(function(card) {
        console.log(
            `YOU GOT...${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        )
    })
})

let deckId = null;
let $btn = $('button');
let $cardArea = $('#card-area');



$.getJSON(`${ baseURL }/${ favNumber }?json`).then(data => {
    console.log(data)
})

let favNumbers = [7, 10];

$.getJSON(`${ baseURL }/${ favNumber }?json`).then(data => {
    console.log(data)
})

Promise.all(
    Array.from({ length: 4 }, () => {
        return $.getJSON(`${ baseURL }/${ favNumber }?json`)
    }))
        .then(d => d.forEach(v => $("body").append(`<p>${v.text}</p>`)))
    
