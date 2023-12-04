/** Demo app for routing. */

const express = require('express');
const ExpressError = require("./expressError")
const app = express();
const userRoutes = require('./routes');

app.use(express.json());
// use the router middleware
//  apply a prefix to every route in userRoutes
app.use('/users', userRoutes);

// this applies to all requests at all paths
app.use(function(req, res, next) {
  console.log(`A ${req.method} request
                is coming to "${req.path}"!`);
  // transfer control to the next matching handler
  return next();
});

// normal route handler
app.get('/hello/:name', function(req, res, next) {
  return res.send('Hello ' + req.params.name);
});

// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

// generic error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});
// end generic handler
app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
// end app.listen
