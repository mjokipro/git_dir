const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json())

app.post('/', function(req, res, next) {
  try {
    let developers = req.body.developers
    
    return res.json(developers)
  } catch {
    next(err);
  }
});

// async function getHub(d) {
//   let results = await axios.get(`https://api.github.com/users/${d}`);
// }
app.listen(3000);