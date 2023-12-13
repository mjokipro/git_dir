/** Express app for pg-relationships-demo */

const express = require('express');
const app = express();
const ExpressError = require('./expressError');

// Parse request bodies for JSON
app.use(express.json());

const uRoutes = require('./routes/users');
const mRoutes = require('./routes/messages');
app.use('/users', uRoutes);
app.use('/messages', mRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError('Not Found', 404);

  // pass err to the next middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message
  });
});

app.listen(3000, function () {
  console.log('Server started on 3000');
});
