class Pokemon {
    constructor(id) {
        this.id = id
        this.types = []
    }

    async getInfo() {
        let url = `https://pokeapi.co/api/v2/pokemon/${ this.id }`
        let response = await axios.get(url)
        this.name = response.data.name
        for(let type of response.data.types) {
            console.log(type)
            this.types.push(type.type.name)
        }
    }
    
};

let pok = new Pokemon(45)

// function getThreePokemon() {
//     let url = `https://pokeapi.co/api/v2/pokemon`
//     axios.get(`${ url }/1`)
//     .then(({data}) => {
//         console.log(`${data.name}`)
//         return axios.get(`${ url }/2`)
//     })
//     .then(({data}) => {
//         console.log(`${data.name}`)
//         return axios.get(`${ url }/3`)
//     })
//     .then(({data}) => {
//         console.log(`${data.name}`)
//     })
//     .catch(e => {
//         console.log(e)
//     })
// }

async function getThreePokemonSeries() {
    let url = `https://pokeapi.co/api/v2/pokemon`
    let { data:p1 } = await axios.get(`${ url }/1`)
    let { data:p2 } = await axios.get(`${ url }/2`)
    let { data:p3 } = await axios.get(`${ url }/3`)
    console.log(p1.name)
    console.log(p2.name)
    console.log(p3.name)
    
    
    // .then(({data}) => {
        //     console.log(`${data.name}`)
        //     return axios.get(`${ url }/2`)
        // })
        // .then(({data}) => {
            //     console.log(`${data.name}`)
            //     return axios.get(`${ url }/3`)
            // })
            // .then(({data}) => {
                //     console.log(`${data.name}`)
                // })
                // .catch(e => {
                    //     console.log(e)
                    // })
}

async function getThreePokemonParallel() {
    let url = `https://pokeapi.co/api/v2/pokemon`
    let p11Promise = axios.get(`${ url }/1`)
    let p22Promise = axios.get(`${ url }/2`)
    let p33Promise = axios.get(`${ url }/3`)
    
    let p1 = await p11Promise
    let p2 = await p22Promise
    let p3 = await p33Promise

    console.log(p1)
    console.log(p2)
    console.log(p3)
}

async function getThreePokemonParallelPromiseAll() {
    let url = `https://pokeapi.co/api/v2/pokemon`
    let all = await Promise.all([
        axios.get(`${ url }/1`),
        axios.get(`${ url }/2`),
        axios.get(`${ url }/3`)
    ])
    
    return all.map((v) => {
        return console.log(`${ v.data.name }`)
    })
}