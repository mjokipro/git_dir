const express = require("express");
const ExpressError = require("./expressError");
const middleware = require("./middleware")
const morgan = require("morgan")

const userRoutes = require("./userRoutes")

const app = express();

app.use(express.json());
// app.use(middleware.logger)
app.use(morgan('dev'))


app.use('/users', userRoutes)
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

app.get('/secret', middleware.checkForPassword, (req, res, next) => {
  return res.send("I LOVE YOU <3 FOR REAL MARRY ME")
})

app.get('/private', middleware.checkForPassword, (req, res, next) => {
  return res.send("YOU HAVE REACHED THE PRIVATE PAGE.  IT IS PRIVATE.")
})

// 404 handler
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

// generic error handler
app.use(function (err, req, res, next) {
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

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
