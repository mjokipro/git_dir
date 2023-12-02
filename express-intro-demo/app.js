/** Simple demo Express app. */

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Homepage renders simple message. */

app.get('/', function(req, res) {
  return res.send('Hello World!');
});

/** Show info on instructor. */

app.get('/staff/:fname', function(req, res) {
  return res.send(`This instructor is ${req.params.fname}`);
});

/** Show JSON on instructor */

app.get('/api/staff/:fname', function(req, res) {
  return res.json({ fname: req.params.fname });
});

/** Add a new instructor. */

app.post('/api/staff', function(req, res) {
  // Do some database operation here...
  return res.send({
    fname: req.body.fname
  });
});

/** Sample of returning status code */

app.get('/whoops', function(req, res) {
  return res.status(404).json('Whoops! Nothing here!');
});

/** Sample of validating / error handling */

app.get('/dogs/:name', function(req, res) {
  if (req.params.name !== 'Whiskey') {
    return res
            .status(403)
            .json('Only Whiskey is Allowed.');
  }

  return res.json('Hello Whiskey!');
});

/** Start server on port 3000 */

app.listen(3000, function() {
  console.log('Server started on port 3000.');
});
