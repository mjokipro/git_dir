const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const greetings = {
  en: "hello",
  fr: "bonjour"
}

app.get('/', (req, res) => {
  return res.redirect('/dogs')})
  
app.get('/dogs', (req, res) => {
  console.log("Root")
  console.log(req)
  // console.log(res)
    return res.send('<h1>i am a dog</h1>')})
    
app.get('/dogs2', (req, res) => {
  console.log("Root")
  console.log(req)
  // console.log(res)
    return res.send([1, 2, 3])})

app.get('/post', function getPost(req, res) {
  res.send("You created new post!")})

app.post('/post', function createPost(req, res) {
  res.send("You created new post!")})

app.get("/greet/:language", (req, res) => {
  lang = req.params.language
  greet = greetings[lang]
  if(!greet) return res.send("Invalid language")
  return res.send(greet)
})

//////  query string  //////
//////  /search?term=pig&sort=cute  //////
app.get('/search', (req, res) => {
  ///  destructure query str keys, and set defaults  ///
  const { term='piggies', sort='top' } = req.query
  console.log(req.query)
  return res.send(`${term}, ${sort}`)
})

//////  request.headers  //////
app.get('/headers', (req, res) => {
  console.log(req.rawHeaders)
  console.log(req.headers)
  res.send(req.headers)
})

//////  show language from header  //////
app.get('/show-language', (req, res) => {
  lang = req.headers['accept-language']
  res.send(`${lang}`)
})

//////  must import express.json()  //////
app.post('/register', (req, res) => {
  res.send(`${req.body.username}`)
})

// app.get('/staff/:fname', function(req, res){
//     return res.send(`Instructor:  ${ req.params.fname }`)})

// app.post('/api/staff', function(req, res){
//     return res.send( { fname: req.body.fname } )})

// app.get('/api/staff/:fname', function(req, res){
//     return res.json( { fname: req.params.fname } )})

// app.get('/whoops', function(req, res){
//     return res.status(404).json('Whoops')
// })

//////  put app.listen() at end of file  //////
app.listen(3000, function(){console.log("App on 3000")})