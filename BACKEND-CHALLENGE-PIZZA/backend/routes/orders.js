"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Pizza = require("../models/pizza");
const { createToken } = require("../helpers/tokens");

const router = express.Router();

router.get("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const pizzas = await Pizza.findAll();
      return res.json({ pizzas });
    } catch (err) {
      return next(err);
    }
  });


  
module.exports = router;