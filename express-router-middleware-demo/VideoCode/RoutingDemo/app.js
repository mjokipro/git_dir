const express = require("express");
const ExpressError = require("./expressError");
// const morgan = require("morgan")
// const userRoutes = require("./userRoutes")
const app = express();
const middleware = require("./middleware")
const catRoutes = require("./routes/cats")

app.use(express.json());

// app.use(middleware.logger)
// app.use(morgan('dev'))


// app.use('/api/users', userRoutes)
// app.use('/users', userRoutes)
app.use('/cats', catRoutes)



// include to remove excess from call trace, stopping 404 in terminal //
app.get('/favicon.ico', (req, res) => res.sendStatus(204))

///  sample authentications routes  ///
app.get('/secret', middleware.checkForPassword, (req, res, next) => {
  return res.send("secret")
})

app.get('/private', middleware.checkForPassword, (req, res, next) => {
  return res.send("private")
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

module.exports = app