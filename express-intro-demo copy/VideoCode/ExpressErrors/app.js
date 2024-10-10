const express = require('express');
const ExpressError = require('./expressError')

const app = express();


function attemptToSaveToDB() {
  throw "Connection Error!"
}

const USERS = [
  { username: "StacysMom", city: "Reno" },
  { username: "Rosalia", city: "R" },
]

app.get("/users/:username", function (req, res, next) {
  try {
    const user = USERS.find(u => u.username === req.params.username);
    if (!user) throw new ExpressError("invalid username", 404)
    return res.send({ user })
  } catch (e) {
    next(e)
  }
})

app.get("/secret", (req, res, next) => {
  try {
    if (req.query.password != 'popcorn') {
      throw new ExpressError("invalid password", 403)
    }
    return res.send("CONGRATS YOU KNOW THE PASSWORD");
  } catch (e) {
    next(e)
  }

})

app.get('/savetodb', (req, res, next) => {
  try {
    attemptToSaveToDB()
    return res.send("SAVED TO DB!")
  } catch (e) {
    return next(new ExpressError("Database Error"))
  }
})

// If no other route matches, respond with a 404
app.use((req, res, next) => {
  const e = new ExpressError("Page Not Found", 404)
  next(e)
})


// Error handler
app.use(function (err, req, res, next) { //Note the 4 parameters!
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.msg;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000")
});




