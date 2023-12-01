// let planet;

// $.getJSON("https://swapi.dev/api/planets/1/", response => {
//   planet = response
//   console.log(planet);
    
//   $.getJSON(planet.residents[0], response => {
//     resident = response
//     console.log(resident);
        
//     $.getJSON(planet.films[0], response => {
//         film = response
//         console.log(film);

// })})})
  


// let url = "https://swapi.dev/api/planets/1/";
// let ourFirstPromise = axios.get(url);
// console.log(ourFirstPromise)
// console.log("Request Sent...")
// // ourFirstPromise.then(() => console.log("Resolved!"))
// // ourFirstPromise.catch(() => console.log("Rejected!"))
// ourFirstPromise.then(r => console.log(r.data))
// ourFirstPromise.catch(err => console.log("Rejected", err))

// console.log("End of Line.")

// let url = "https://swapi.dev/api/planets/1/";
// axios.get(url)
//     .then(r => {
//         console.log(r)
//         axios.get(r.data.residents[0])
//         // console.log(r.data.residents[0])
//         .then(r => {
    //             console.log(r)
    //         })
    //         .catch(err => {
        //             console.log("Error", err)
        //         })
        //     })
        //     .catch(err => console.log("Rejected", err))
        // console.log("End of Line.")
        
// let url = "https://swapi.dev/api/planets/1/";
// axios.get(url)
//     .then(r => {
//         console.log("first request resolved...")
//         console.log(r.data)
//         return axios.get(r.data.residents[0])      
//     })
//     .then(r => {
//         console.log(r.data)     
//         return axios.get(r.data.films[0])
//     })
//     .catch(err => console.log("Rejected", err))
// console.log("End of Line.")

// function wait3Seconds(){
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 3000)
//     })
// }
// wait3Seconds()
//     .then(() => console.log("All Done"))
//     .catch(() => console.log("Error."))

// const h1 = document.querySelector('h1')
// setTimeout(function() {
//     h1.style.color = 'orange'
//     setTimeout(() => {
//         h1.style.color = 'blue'
//     }, 1000)
// }, 1000)



// function changeColor(el, color) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             el.style.color = color;
//             resolve()
//         }, 1000)
//     })
// }

// changeColor(h1, 'teal')
//     .then(() => changeColor(h1, 'orange'))
//     .then(() => changeColor(h1, 'blue'))

function mockAjaxRequest () {
    return new Promise(function (resolve, reject) {
    let probSucc = 0.5;
    let requestTime = 1000;
    
    setTimeout(function() {
        let randomNum = Math.random()
        if (randomNum < probSucc) {
            let data = "here's your data";
            resolve(data);
        } else {
            reject("Request failed.")
        }
    }, requestTime)
})
}

mockAjaxRequest()
    .then(data => {
        console.log(data);
        return mockAjaxRequest()
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))

    // Promise.all(fourPokemonPromises)
    //   .then(pokemonArr => {
    //     for (res of pokemonArr) {
    //       console.log(res.data.name)
    //     }
    //   })
    //   .catch(err => console.log(err));

let fourPokemonPromises = [];

for (let i = 1; i < 5; i++) {
  fourPokemonPromises.push(
    axios.get(`https://pokeapi.co/api/v2/pokemon/${i}/`)
  );
}

Promise.race(fourPokemonPromises)
    .then(r => console.log(`{r.data.name} won`))
    .catch(r => console.log(r))