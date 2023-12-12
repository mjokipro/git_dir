/** Express app for pg-intro-demo */

const express = require("express");
const app = express();
const ExpressError = require("./expressError");
// const uRoutes = require("routes/users")
const db = require("./db")


// Parse request bodies for JSON
app.use(express.json());

// app.use("/users", uRoutes)

app.get('/', async (req, res) => {
  const results = await db.query(`SELECT * FROM usersdb`)
  return res.json(results.rows)
})
/** 404 handler */

app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass err to the next middleware
  return next(err);
});

/** general error handler */

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

// module.exports = app

app.listen(3000, function () {
  console.log("Server started on 3000");
});
