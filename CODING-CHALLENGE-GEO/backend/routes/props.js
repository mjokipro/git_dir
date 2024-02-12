"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Prop = require("../models/prop");
// const userNewSchema = require("../schemas/userNew.json");
// const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

router.post("/", ensureAdmin, async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, userNewSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const prop = await Prop.addProp(req.body);
      return res.status(201).json({ prop });
    } catch (err) {
      return next(err);
    }
  });


module.exports = router