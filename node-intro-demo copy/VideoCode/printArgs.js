process.on('exit', function (code) {
  console.log(`EXITING WITH CODE: ${code}`)
})

for (let arg of process.argv) {
  console.log(arg)
}


setInterval(function () {
  console.log("HELLO!")
}, 1000)

setInterval(function () {
  process.exit(2)
}, 6000)

