const fs = require('fs');

fs.readFile('myFile.txt', 'utf8', function(err, data) {
  if (err) {
    // handle possible error
    console.error(err);
    // kill the process and tell the shell it errored
    process.exit(1);
  }
  // otherwise success
  console.log(`file contents: ${data}`);
});

console.log('reading file');
// file won't have been read yet at this point
