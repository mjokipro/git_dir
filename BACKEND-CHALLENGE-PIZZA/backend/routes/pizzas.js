"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");
// const newPizzaSchema = require("../schemas/pizzaNew.json")

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Pizza = require("../models/pizza");
const { createToken } = require("../helpers/tokens");

const router = express.Router();

/** POST / { pizza } =>  { pizza }
 *
 * pizza should be { type, description, price }
 *
 * Returns { type, description, price }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, newPizzaSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const pizza = await Pizza.create(req.body);
    return res.status(201).json({ pizza });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { pizzas: [ { type, description, price }, ...] }
 *
 * Authorization required: none
 */
router.get("/", async function (req, res, next) {
    try {
      const pizzas = await Pizza.findAll();
      return res.json({ pizzas });
    } catch (err) {
      return next(err);
    }
  });

/** GET /[type]  =>  { pizza }
 *
 *  Pizza is { type, description, price }
 *
 * Authorization required: none
 */

router.get("/:type", async function (req, res, next) {
    try {
      const pizza = await Pizza.get(req.params.type);
      return res.json({ pizza });
    } catch (err) {
      return next(err);
    }
  });

/** PATCH /[type] { fld1, fld2, ... } => { pizza }
 *
 * Patches pizza data.
 *
 * fields can be: { type, description, price }
 *
 * Returns { type, description, price}
 *
 * Authorization required: admin
 */

router.patch("/:type", ensureAdmin, async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, companyUpdateSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const pizza = await Pizza.update(req.params.type, req.body);
      return res.json({ pizza });
    } catch (err) {
      return next(err);
    }
  });

  /** DELETE /[type]  =>  { deleted: type }
 *
 * Authorization: admin
 */

router.delete("/:type", ensureAdmin, async function (req, res, next) {
    try {
      await Pizza.remove(req.params.type);
      return res.json({ deleted: req.params.type });
    } catch (err) {
      return next(err);
    }
  });


module.exports = router;