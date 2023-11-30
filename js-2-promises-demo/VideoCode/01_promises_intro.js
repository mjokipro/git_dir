// ==============================================
// WITHOUT PROMISES (THE OLD WAY)
// ==============================================
// ------ Get the first planet
// ------ When that planet  request finishes, get the first resident
// ------ When that resident request finishes, get the first film

// LOTS OF NESTING, VERY UGLY TO READ
// Note: We are using jQuery because it still supports "the old way" 
// (axios only supports promises)
// ==============================================

// let planet;
// $.getJSON("https://swapi.dev/api/planets/1/", response => {
//   planet = response;
//   console.log(planet);
//   $.getJSON(planet.residents[0], response => {
//     resident = response;
//     console.log(resident);
//     $.getJSON(resident.films[0], response => {
//       film = response;
//       console.log(film);
//     }, err => {
//       console.log(err)
//     });
//   }, err => {
//     console.log(err)
//   });
// }, err => {
//   console.log(err)
// });


// ==============================================
// PROMISES! (using Axios)
// ==============================================
// let url = "https://swapi.dev/api/planeasdasts/1/"
// let ourFirstPromise = axios.get(url);
// console.log("REQUEST HAS BEEN SENT!")
// ourFirstPromise.then(res => console.log(res.data))
// ourFirstPromise.catch(err => console.log("REJECTED!!", err))
// console.log("I AM THE LAST LINE")


// ==============================================
// NESTED REQUESTS...still ugly even with promises
// ==============================================
// let url = "https://swapi.dev/api/planets/1/"
// axios.get(url)
//   .then(res => {
//     console.log(res)
//     axios.get(res.data.residents[0])
//       .then(res => {
//         console.log(res)
//       })
//       .catch(err => {
//         console.log("ERRROROROROROROR", err)
//       })
//   })
//   .catch(err => console.log("REJECTED!!", err))

// ==============================================
// PROMISE CHAINING - The Real Magic of Promises!
// ==============================================
let url = "https://swapi.dev/api/planets/1/";
axios.get(url)
  .then(res => {
    console.log("FIRST PROMISE RESOLVED!")
    console.log(res.data)
    return axios.get(res.data.residents[0])
  })
  .then(res => {
    console.log("SECOND PROMISE RESOLVED!")
    console.log(res.data)
    return axios.get(res.data.films[0])
  })
  .then(res => {
    console.log("THIRD PROMISE RESOLVED!")
    console.log(res.data)
  })
  .catch(err => console.log("REJECTED!!", err))