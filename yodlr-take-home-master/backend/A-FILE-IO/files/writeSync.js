const fs = require('fs');

const content = 'THIS WILL GO IN THE FILE!';

try {
  fs.writeFileSync('./files/output.txt', content);
  console.log('Successfully wrote to file!');
} catch (error) {
  console.error(`File write failed: ${error}`)
  process.exit(1);
}
