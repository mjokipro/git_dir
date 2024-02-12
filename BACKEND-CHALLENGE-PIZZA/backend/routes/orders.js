"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Order = require("../models/order");

const router = express.Router();

/** POST / { order } => { order }
 *
 * order should be { user_id, total_items, total_price }
 *
 * Returns { id, user_id, total_items, total_price }
 *
 * Authorization required: admin
 */

router.post("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, jobNewSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const order = await Order.create(req.body);
      return res.status(201).json({ order });
    } catch (err) {
      return next(err);
    }
  });

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

/** GET /[orderId] => { order }
 *
 * Returns { id, user_id, total_items, total_price }
 *   where pizzas are [{ type, description, price }, ...]
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
    try {
      const order = await Order.get(req.params.id);
      return res.json({ order });
    } catch (err) {
      return next(err);
    }
  });

  /** POST / { order } => { order }
 *
 * order should be { user_id, total_items, total_price }
 *
 * Returns { id, user_id, total_items, total_price }
 *
 * Authorization required: admin
 */

router.post("/:order_id/add", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, jobNewSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const pizzaItem = await Order.addPizzaItem(req.body);
      return res.status(201).json({ pizzaItem });
    } catch (err) {
      return next(err);
    }
  });

  /** PATCH /[id]  { fld1, fld2, ... } => { order }
 *
 * Data can include: { total_items, total_price }
 *
 * Returns { id, total_items, total_price }
 *
 * Authorization required: admin
 */

router.patch("/:order_id/:type", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
    //   const validator = jsonschema.validate(req.body, jobUpdateSchema);
    //   if (!validator.valid) {
    //     const errs = validator.errors.map(e => e.stack);
    //     throw new BadRequestError(errs);
    //   }
  
      const pizzaItem = await Order.updatePizzaItem(req.params.order_id, req.params.type, req.body);
      return res.json({ pizzaItem });
    } catch (err) {
      return next(err);
    }
  });

  router.delete("/:order_id/:type", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await Order.removePizzaItem(req.params.order_id, req.params.type);
      return res.json({ deleted: +req.params.order_id });
    } catch (err) {
      return next(err);
    }
  });
  
  /** DELETE /[id]  =>  { deleted: id }
   *
   * Authorization required: admin
   */
  
  router.delete("/:id", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      await Order.remove(req.params.id);
      return res.json({ deleted: +req.params.id });
    } catch (err) {
      return next(err);
    }
  });


module.exports = router;