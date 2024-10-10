const Item = require('../item')
const express = require('express')

const router = express.Router()

router.get('/', (req, res, next) => {
  try{
    return res.json({items: Item.findAll()})
  } catch (e){
    return next(e)
  }
})

router.post('/', (req, res, next) => {
  try{
    let i = new Item(req.body.name, req.body.price)
    return res.json({item: i})
  } catch (e){
    return next(e)
  }
})

router.get('/:name', (req, res, next) => {
  try{
    let i = Item.find(req.params.name)
    return res.json({item: i})
  } catch (e){
    return next(e)
  }
})

router.patch('/:name', (req, res, next) => {
  try{
    let i = Item.update(req.params.name, req.body)
    return res.json({item: i})
  } catch (e){
    return next(e)
  }
})

router.delete('/:name', (req, res, next) => {
  try{
    Item.remove(req.params.name)
    return res.json({message: "Deleted"})
  } catch (e){
    return next(e)
  }
})

module.exports = router