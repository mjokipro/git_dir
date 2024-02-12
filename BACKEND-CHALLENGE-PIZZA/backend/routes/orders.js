"use strict";

/** Routes for users. */

// const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Order = require("../models/order");

const router = express.Router();

router.get("/", ensureCorrectUserOrAdmin, async function (req, res, next) {
    try {
      const orders = await Order.findAll();
      return res.json({ orders });
    } catch (err) {
      return next(err);
    }
  });



module.exports = router;