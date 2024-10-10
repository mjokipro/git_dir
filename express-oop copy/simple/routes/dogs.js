const express = require("express");
const router = new express.Router();
const Dog = require("../models/dog");

router.get("/", async function (req, res, next) {
  try {
    let dogs = await Dog.getAll()
    dogs.forEach(d => d.speak())
      return res.json(dogs)
  } catch (e) {
      return next(e);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let dog = await Dog.getById(req.params.id)
      return res.json(dog)
  } catch (e) {
      return next(e);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { name, age } = req.body
    let dog = await Dog.addDog(name, age)
      return res.json(dog)
  } catch (e) {
      return next(e);
  }
});




module.exports = router;