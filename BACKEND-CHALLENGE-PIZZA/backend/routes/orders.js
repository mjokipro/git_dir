"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Order = require("../models/order");

const router = express.Router();

    /** GET / =>
 *   { orders: [ { id, user_id, total_items, total_price }, ...] }
 *
 * Authorization required: none
 */

router.get("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const orders = await Order.findAll();
      return res.json({ orders });
    } catch (err) {
      return next(err);
    }
  });

    /** GET / =>
 *   { orders: [ { id, user_id, total_items, total_price }, ...] }
 *
 * Authorization required: none
 */

// router.get("/", async function (req, res, next) {
    // const q = req.query;
    // arrive as strings from querystring, but we want as int/bool
    // if (q.minSalary !== undefined) q.minSalary = +q.minSalary;
    // q.hasEquity = q.hasEquity === "true";
  
    // try {
    //   const validator = jsonschema.validate(q, jobSearchSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
//       const orders = await Order.findAll();
//       return res.json({ orders });
//     } catch (err) {
//       return next(err);
//     }
//   });


module.exports = router;