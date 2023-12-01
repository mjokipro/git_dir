const fs = require('fs');

fs.readFile('poem.txt', 'utf8', (err, data) => {
  if (err) {
    console.log("ERROR:", err);
    process.kill(1)
  }
  console.log("DATA...", data)
})

const line = "\nAnd Eternity in an hour";

// Set flag to 'a' to append to file rather than overwriting existing contents
fs.writeFile('poem.txt', line, { encoding: 'utf8', flag: 'a' }, err => {
  if (err) {
    console.log("ERROR!!!", err)
    process.kill(1)
  }
  console.log("IT WORKED!")
})

// fs.appendFile('podem.txt', "\nAPPEND ME!!!", 'utf8', err => {
//   if (err) {
//     console.log("ERROR!!!", err)
//     process.kill(1)
//   }
//   console.log("IT WORKED!")
// })