/** Dog routes for express-pg-oo */

const express = require("express");

const Dog = require("../models/dog");

const router = new express.Router();

// IMPORTANT: all of these function bodies should really be
// wrapped in a try/catch, where catching an error calls
// next(err) --- this is omitted here for brevity in slides


/** get all dogs: [{id, name, age}, ...] */

router.get("/", async function (req, res, next) {
  let dogs = await Dog.getAll();
  return res.json(dogs);
});

/** get dog by id: {id, name, age} */

router.get("/:id", async function (req, res, next) {
  let dog = await Dog.getById(req.params.id);
  return res.json(dog);
});

/** create dog from {name, age}: return id */

router.post("/", async function (req, res, next) {
  let id = await Dog.create(req.body.name, req.body.age);
  return res.json(id);
});

/** delete dog from {id}; returns "deleted" */

router.delete("/:id", async function (req, res, next) {
  let dog = await Dog.getById(req.params.id);
  await dog.remove();
  return res.json("deleted");
});


/** age dog: returns new age */

router.post("/:id/age", async function (req, res, next) {
  let dog = await Dog.getById(req.params.id);
  dog.age += 1;
  await dog.save();
  return res.json(dog.age);
});


module.exports = router;