const fs = require('fs');

try {
  // store the read file contents
  var contents = fs.readFileSync('myFile.txt', 'utf8');
  console.log(`file contents are "${contents}"`);
} catch (error) {
  // errors thrown by fs will be caught here
  console.error(error);
  // kill the process and tell the shell it errored
  process.exit(1);
}


