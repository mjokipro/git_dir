"use strict";

/** Routes for jobs. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const  Tag  = require("../models/tag");
// const { ensureCorrectUserOrAdmin } = require("../middleware/auth")
const Post = require("../models/post");
const postNewSchema = require("../schemas/postNew.json");
const postUpdateSchema = require("../schemas-maybe/postUpdate.json");
const postSearchSchema = require("../schemas-maybe/postSearch.json");

const router = express.Router({ mergeParams: true });


/** POST / { post } => { post }
 *
 * post should be { title, content }
 *
 * Returns { id, title, content }
 *
 * Authorization required: admin
 */

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, postNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const post = await Post.create(req.body);
    return res.status(201).json({ post });
  } catch (err) {
    return next(err);
  }
});

/** SEARCHPOSTS
 * GET / =>
 *   { posts: [ { id, title, content }, ...] }
 *   
 * Returns { id, title, content, tags }
 *    where tags is [{ id, name }, ...]
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;
  // arrive as strings from querystring, but we want as int/bool
  // if (!q.title) return

  try {
    const validator = jsonschema.validate(q, postSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const posts = await Post.findAll(q);
    return res.json({ posts });
  } catch (err) {
    return next(err);
  }
});

/** GET /[post.id] => { post }
 *
 * Returns { id, title, content, tags }
 *   where tags is [{ id, name }, ...]
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const post = await Post.get(req.params.id);
    // const postId = post.id
    const tags = await Tag.getTagsForPost(req.params.id);
    return res.json({  post, tags });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[post.id]  { fld1, fld2, ... } => { post }
 *
 * Data can include: { title, content }
 *
 * Returns { id, title, content, tags }
 *   where tags is [{ id, name }, ...]
 *
 * Authorization required: admin
 */

router.patch("/:id", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, postUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const post = await Post.update(req.params.id, req.body);
    return res.json({ post });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[post.id]  =>  { deleted: id }
 *
 * Authorization required: admin
 */

router.delete("/:id", async function (req, res, next) {
  try {
    await Post.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
