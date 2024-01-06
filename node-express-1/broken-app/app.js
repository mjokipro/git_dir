const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.post('/', async function(req, res, next) {
  try {
    let listOfDevs = req.body.developers;

    let results = await Promise.all(listOfDevs.map(async dev => {
        return await axios.get(`https://api.github.com/users/${dev}`);
    }));
    
    let out = results.map( r =>  ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } 
  catch(err) {
    next(err);
  }
});

app.listen(3000);
