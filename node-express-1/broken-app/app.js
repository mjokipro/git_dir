
const express = require("express")
const app = express();

// const ExpressError = require("./expressError")

app.use(express.json());

app.post("/", (req, res) => {
  let developers = req.body.developers
  let devs = getGit()
  return res.json(devs)
})
/** 404 handler */

async function getGit(){
  let results = await $.getJSON(`https://api.github.com/users`);
  return results
}
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