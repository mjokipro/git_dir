const axios = require('axios');

axios.get('http://google.com').then(function(resp) {
  console.log(resp.data.slice(0, 80), '...');
});
