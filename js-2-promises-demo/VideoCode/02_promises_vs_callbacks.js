// ****************************
// VERSION 1 - Nested Callbacks
// ****************************
// let baseURL = "https://pokeapi.co/api/v2/pokemon";

// $.ajax(`${baseURL}/1/`, {
//   success: p1 => {
//     console.log(`The first pokemon is ${p1.name}`);
//     $.ajax(`${baseURL}/2/`, {
//       success: p2 => {
//         console.log(`The second pokemon is ${p2.name}`);
//         $.ajax(`${baseURL}/3/`, {
//           success: p3 => {
//             console.log(`The third pokemon is ${p3.name}`);
//           },
//           error: err => console.log(err)
//         });
//       },
//       error: err => console.log(err)
//     });
//   },
//   error: err => console.log(err)
// });


// ****************************
// VERSION 2 - Promises!
// ****************************
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


