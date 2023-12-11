
const express = require("express")
const app = express();
const request = require('request');

// const ExpressError = require("./expressError")

app.use(express.json());

// app.post("/", (req, res) => {
//   let developers = req.body.developers
//   let devs = getGit()
//   return res.json(devs)
// })

app.post('/', function(req, res) {
  let developers = req.body.developers
  request(`https://api.github.com/search/users?q=${developers}`, function(error, response, body) {
    console.log(body)
    return res.json(response.body)
  });

});

async function getGit(){
  let results = await $.getJSON(`https://api.github.com/users`);
  return results
}

/** 404 handler */
// app.use(function (req, res, next) {
//   return new ExpressError("Not Found", 404);
// });

// /** general error handler */

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);

//   return res.json({
//     error: err.message,
//   });
// });

app.listen(3000);