const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/dogs', function(req, res){
    return res.send('dogs bark')})

app.get('/staff/:fname', function(req, res){
    return res.send(`Instructor:  ${ req.params.fname }`)})

app.post('/api/staff', function(req, res){
    return res.send( { fname: req.body.fname } )})

app.get('/api/staff/:fname', function(req, res){
    return res.json( { fname: req.params.fname } )})

app.get('/whoops', function(req, res){
    return res.status(404).json('Whoops')
})

//////  put app.listen() at end of file  //////
app.listen(3000, function(){console.log("App on 3000")})