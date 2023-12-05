const express = require('express');
const ExpressError = require('./expressError')

const app = express();

// app.use(express.json())
//////  next()  //////
app.use((req, res, next) => {
  console.log("server request")
  // console.log(req)
  next()
})

app.use((req, res, next) => {
  console.log("server request 2")
  // console.log(res)
  next()
})

function attemptToSaveToDB() {
  throw "Connection Error!"
}

const USERS = [
  { username: "StacysMom", city: "Reno" },
  { username: "Rosalia", city: "R" },
]

// if (!user) res.status(404).send("not found")
app.get("/users/:username", function (req, res, next) {
try{
  const user = USERS.find(u => u.username === req.params.username)
  if (!user) throw new ExpressError("Invalid username", 404)
    return res.send({user})
} catch(e) {
    next(e)
}
})

app.get("/secret", (req, res, next) => {
  debugger
  try{
    if (req.query.password != 'popcorn') throw new ExpressError("Invalid password", 403)
      return res.send("password is correct")
  } catch(e) {
    next(e)
  }
})

app.get('/savetodb', (req, res, next) => {
try{
    attemptToSaveToDB()
    return res.send("saved to db")
  } catch(e) {
    return next(new ExpressError("db error"))
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
// Error handler
// app.use((error, req, res, next) => {
//   console.log(error.status)
//   console.log(error.message)
//   res.status(error.status).send(error.message)
// })

app.listen(3000, () => {
  console.log("Server running on port 3000")
});




