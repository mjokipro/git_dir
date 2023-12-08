const express = require("express")
const router = new express.Router()

const users = []

router.get('/', function(req, res){
    return res.json(users)
})

router.delete('/:id', function(req, res){
    const idx = users.findIndex(u => u.id === +req.params.id)
    users.splice(idx, 1)
    return res.json({message: "Deleted"})
})

module.exports = router