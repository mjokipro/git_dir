// const deck = {
//     async init(){
//         let res = await axios.get('https://deckofcardsapi.com/api/deck/new/')
//         console.log(res.data)
//         this.deckId = res.data.deck_id
//         console.log(this.deckId)
//     },
//     async shuffle(){
//         let res = await axios.get(`https://deckofcardsapi.com/api/deck/${ this.deckId }/shuffle/`)
//         console.log(res)
//     },
//     async drawCard(){
//         let res = await axios.get(`https://deckofcardsapi.com/api/deck/${ this.deckId }/draw/?count=2`)
//         console.log(res)
//     }
// }