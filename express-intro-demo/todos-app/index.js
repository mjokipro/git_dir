const express = require("express");
const app = express();

// using a simple array for storage, this is not ideal in the real world, but good for a simple demo
let tasks = [];

app.use(express.json())

app.get("/todos", function(req,res){
  debugger
  res.send(tasks)
})

app.post("/todos", function (req, res) {
  tasks.push(req.body.newTask)
  res.send(tasks)
})

app.delete("/todos", function (req, res) {
  tasks = []
  res.send({message: "All tasks deleted!"})
})

app.listen(3000, function(){
  console.log("Server started on port 3000!")
})