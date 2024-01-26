"use strict";

/** Routes for companies. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin, ensureCorrectUserOrAdmin, ensureLoggedIn } = require("../middleware/auth");
const Tag = require("../models/tag");

const tagNewSchema = require("../schemas/tagNew.json");
const tagUpdateSchema = require("../schemas-maybe/tagUpdate.json");
const tagSearchSchema = require("../schemas-maybe/tagSearch.json");

const router = new express.Router();


/** POST / { tag } =>  { tag }
 *
 * tag should be { name }
 *
 * Returns { id, name }
 *
 * Authorization required: admin
 */

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, tagNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const tag = await Tag.create(req.body);
    console.debug("POST / { tag } =>  { tag }:  ", tag)
    return res.status(201).json({ tag });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { tags: [ { name }, ...] }
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;
  // arrive as strings from querystring, but we want as ints

  if(!q) return

  try {
    const validator = jsonschema.validate(q, tagSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const tags = await Tag.findAll(q);
    console.debug("GET / { tags: [ { name }, ...] }", tags)

    return res.json({ tags });
  } catch (err) {
    return next(err);
  }
});

/** GET /[tag.id]  =>  { tag }
 *
 *  Tag is { name }
 *   where posts is [{ id, title, content }, ...]
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const tag = await Tag.get(req.params.id);
    console.debug("GET / tags/:id", tag)
    return res.json({ tag });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[tag.id] { fld1 } => { tag }
 *
 * Patches tag data.
*
* fields can be: { name }
*
* Returns { name }
*
* Authorization required: admin
*/

router.patch("/:id", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, tagUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    
    const tag = await Tag.update(req.params.name, req.body);
    console.debug("PATCH / tags/:id", tag)
    return res.json({ tag });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[tag.id]  =>  { deleted: tag.id }
 *
 * Authorization: admin
*/

router.delete("/:id", async function (req, res, next) {
  try {
    await Tag.remove(req.params.name);
    console.debug("DELETE / tags/:id", req.params.name)
    return res.json({ deleted: req.params.name });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
