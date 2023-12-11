
const express = require("express")
const app = express();
const request = require('request')
const ExpressError = require("./expressError")

// const ExpressError = require("./expressError")

app.use(express.json());

// app.post("/", (req, res) => {
//   let developers = req.body.developers
//   let devs = getGit()
//   return res.json(devs)
// })

app.post('/', function(req, res) {
  let developers = req.body.developers;
  request({
    url: `https://api.github.com/search/users?q=${developers}`,
    headers: {
      'User-Agent': 'mjokipro' // Replace 'YourAppName' with your app name or GitHub username
    }
  }, function(error, response, body) {
    console.log(body);
    return res.json(JSON.parse(body)); // Parse the body to JSON before returning
  });
});

async function getGit(){
  let results = await $.getJSON(`https://api.github.com/users`);
  return results
}

/** 404 handler */

app.use(function(req, res) {
  return new ExpressError("Not Found", 404);
});

// generic error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});
// end generic handler
app.listen(3000)