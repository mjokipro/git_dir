/** Routes for users of pg-intro-demo. */

const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");
const Cat = require("../models/cat")

router.get('/', async (req, res, next) => {
  try{
    const cats = await Cat.getAll()
      return res.json(cats)
  } catch(e){
      return next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try{
    const cat = await Cat.getById(req.params.id)
      return res.json(cat)
  } catch(e){
      return next(e)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const { name, age } = req.body
    const cat = await Cat.post_create(name, age)
      return res.json(cat)
  } catch(e){
      return next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try{
    const cat = await Cat.delete(req.params.id)
      return res.json({msg: "Deleted"})
  } catch(e){
      return next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  try{
    const { name, age } = req.body
    const cat = await Cat.update(req.params.id, name, age)
      return res.json(cat)
  } catch(e){
      return next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try{
    const cat = await Cat.makeOlder(req.params.id)
      return res.json(cat)
  } catch(e){
      return next(e)
  }
})



function allCats(){

}

function createCat(){

}

function deleteCat(){
  
}

function updateCat(){

}

// this version doesn't work --- db.query returns a promise,
// so we need to await it in an async function

/** Get users: [user, user, user] */



module.exports = router;