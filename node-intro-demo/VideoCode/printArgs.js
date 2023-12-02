process.on('exit', function(code) {
    console.log(`Exiting with:  ${ code }`)
})

for(let arg of process.argv) {
    console.log(arg)
}

setInterval(function(){
    console.log("hello")
}, 1000)

setInterval(function(){
    console.log("hello")
    process.exit(2)
}, 6000)

// process.exit(1)