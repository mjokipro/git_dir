// async function sayHi() {
//     return "Hello!!"
// }

// async function sayHi() {
//     return Promise.resolve("HELLO")
// }

// async function oops(){
//     return "Bad idea"
// }

// sayHi().then(msg => console.log(msg))

// oops()
//     .then(msg => console.log("INSIDE THEN", msg))
//     .catch(err => console.log("INSIDE CATCH", err))


// let h1 = document.querySelector('h1')

// function changeColor(el, color) {
    //     return new Promise((resolve, reject) => {
        //       setTimeout(() => {
            //         el.style.color = color;
            //         resolve()
            //       }, 1000)
            //    })
            // }
            
            //   changeColor(h1, 'red')
            //     .then(() => changeColor(h1, 'orange'))
            //     .then(() => changeColor(h1, 'yellow'))
            //     .then(() => async function rainbow(el){
                //     await changeColor(el, 'red')
                //     await changeColor(el, 'orange')
                //     await changeColor(el, 'yellow')
                //     await changeColor(el, 'green')
                //     await changeColor(el, 'blue')
                //     await changeColor(el, 'indigo')
                //     await changeColor(el, 'violet')
                // }
                
                // rainbow(h1)changeColor(h1, 'green'))
                //     .then(() => changeColor(h1, 'blue'))
                //     .then(() => changeColor(h1, 'indigo'))
                //     .then(() => changeColor(h1, 'violet'))
                
                
                // 
// const res = async function getStarWarsFilms() {

//     let res = await axios.get("https://swapi.dev/api/films/");

//     console.log(res)
// }

// console.log("start")
// const res2 = axios.get("https://swapi.dev/api/films/")
//     .then(res => {
//         console.log("ending...")
//         console.log(res.data);
// })

async function getUser(user) {
    try {
        let url = `https://api.github.com/users/${user}`
        let res = await axios.get(url)
        // console.log(res)
        console.log(`${res.data.name}: ${res.data.bio}`)
    } catch (e) {
        console.log("user not existant!", e)
    }
}

function getUser2(user) {
    let url = `https://api.github.com/users/${user}`
    axios.get(url)
    .then(res => {
        console.log(`${res.data.name}: ${res.data.bio}`)
    })
    .catch(e => {
            console.log("user not existant!", e)
    })
}

let matt = getUser("matt")
let matt2 = getUser2("matt")