/** pg-oo express application. */


const express = require("express");
const catRoutes = require("./routes/cats");
const dogRoutes = require("./routes/dogs");

const app = express();

app.use(express.json());

app.use("/cats", catRoutes);
app.use("/dogs", dogRoutes);


/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

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
  console.log('listening on 3000');
});
