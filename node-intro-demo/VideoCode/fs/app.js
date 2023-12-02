const fs = require('fs')

// fs.readFile('./poem.txt', 'utf8', (err, data) => {
//     if(err){
//         console.log(err)
//         process.kill(1)
//     }
//     console.log("data...", data)
// })

const line = "bla"

// fs.writeFile('poem.txt', line, {encoding: 'utf8', flag: 'a'}, err => {
//     if(err){
//         console.log(err)
//         process.kill(1)
//     }
//     console.log("it worked")
// })

fs.appendFile('poem.txt', '\n appended text', 'utf8', err => {
    if(err){
        console.log(err)
        process.kill(1)
    }
    console.log("it worked")
})
