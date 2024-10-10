const express = require('express');

const app = express();

// To parse http request body on each request:
app.use(express.json()); //For JSON
app.use(express.urlencoded({ extended: true })); //For Form Data

app.get('/', (req, res) => {
  res.send("HOMEPAGE!")
})

app.get('/dogs', (req, res) => {
  console.log("YOU ASKED FOR /DOGS!")
  res.send("<h1>I AM DOG WOOF WOOF</h1>")
})

// THIS WILL NEVER RUN!
app.get('/dogs', (req, res) => {
  res.send("MEOW MEOW MEOW")
})

app.get('/chickens/', (req, res) => {
  res.send("BOCK! BOCK! BOCK! (get request)")
})
// POST ROUTE
app.post('/chickens', function createChicken(req, res) {
  res.send("YOU CREATED A NEW CHICKEN  (not really) (Post request)")
})

const greetings = {
  en: "hello",
  fr: 'bonjour',
  ic: 'halló',
  ja: 'konnichiwa'
}

// Path Parameters:
app.get("/greet/:language", (req, res) => {
  const lang = req.params.language;
  const greeting = greetings[lang];
  if (!greeting) return res.send("INVALID LANGUAGE");
  return res.send(greeting.toUpperCase());
})

// QUERY STRING!
app.get('/search', (req, res) => {
  const { term = 'piggies', sort = 'top' } = req.query;
  return res.send(`SEARCH PAGE!  Term is: ${term}, sort is: ${sort}`)
})

// REQ.HEADERS
app.get('/show-me-headers', (req, res) => {
  console.log(req.rawHeaders)
  console.log(req.headers)
  res.send(req.headers)
})

app.get('/show-language', (req, res) => {
  const lang = req.headers['accept-language']
  res.send(`Your language preference is: ${lang}`)
})

// ACCESSING REQUEST BODY 
app.post('/register', (req, res) => {
  res.send(`Welcome, ${req.body.username}!!!`);
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
});


