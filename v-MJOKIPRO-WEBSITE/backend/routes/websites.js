"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Website = require("../models/website");

const router = new express.Router();

/** GET /  =>
 *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
 *
 * Can filter on provided search filters:
 * - minEmployees
 * - maxEmployees
 * - nameLike (will find case-insensitive, partial matches)
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.params.title
  console.debug("q=", q)
  try {
    // if (q.id !== undefined) q.id = +q.id;
    // if (q.user_id !== undefined) q.user_id = +q.user_id;
    const websites = await Website.findAll(q);
    console.debug("websites", websites)
    return res.json({ websites });
  } catch (err) {
    return next(err);
  }
});


/** POST / { company } =>  { company }
 *
 * company should be { handle, name, description, numEmployees, logoUrl }
 *
 * Returns { handle, name, description, numEmployees, logoUrl }
 *
 * Authorization required: admin
 */

router.post("/", ensureAdmin, async function (req, res, next) {
  try {

    const website = await Website.create(req.body);
    return res.status(201).json({ website });
  } catch (err) {
    return next(err);
  }
});


/** GET /[handle]  =>  { company }
 *
 *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
 *   where jobs is [{ id, title, salary, equity }, ...]
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const website = await Website.get(req.params.id);
    return res.json({ website });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[handle] { fld1, fld2, ... } => { company }
 *
 * Patches company data.
 *
 * fields can be: { name, description, numEmployees, logo_url }
 *
 * Returns { handle, name, description, numEmployees, logo_url }
 *
 * Authorization required: admin
 */

router.patch("/:id", ensureAdmin, async function (req, res, next) {
  try {


    const website = await Website.update(req.params.id, req.body);
    return res.json({ website });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: handle }
 *
 * Authorization: admin
 */

router.delete("/:id", ensureAdmin, async function (req, res, next) {
  try {
    await Website.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

/** POST /[username]/jobs/[id]  { state } => { application }
 *
 * Returns {"applied": jobId}
 *
 * Authorization required: admin or same-user-as-:username
 * */

router.post("/:id/skills/:name", ensureCorrectUserOrAdmin, async function (req, res, next) {
  try {
    const websiteId = +req.params.id;
    await Website.addSkill(websiteId, req.params.name);
    return res.json({ applied: req.params.name });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
