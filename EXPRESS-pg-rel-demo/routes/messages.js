/** Routes for messages of pg-relationships-demo. */

const db = require("../db");
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");


/** Get message: {id, msg tags: [name, name]} */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
          `SELECT m.id, m.msg, t.tag
             FROM messages AS m
               LEFT JOIN messages_tags AS mt 
                 ON m.id = mt.message_id
               LEFT JOIN tags AS t ON mt.tag_code = t.code
             WHERE m.id = $1;`,
        [req.params.id]);

    let { id, msg } = result.rows[0];
    let tags = result.rows.map(r => r.tag);

    return res.json({ id, msg, tags });
  }

  catch (err) {
    return next(err);
  }
});
// end

/** Update message: {msg} => {id, user_id, msg} */

router.put("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
          `UPDATE messages SET msg=$1 WHERE id = $2
           RETURNING id, user_id, msg`,
        [req.body.msg, req.params.id]);

    return res.json(result.rows[0]);
  }

  catch (err) {
    return next(err);
  }
});
// end

/** Update message #2: {msg} => {id, user_id, msg} */

router.put("/v2/:id", async function (req, res, next) {
  try {
    const checkRes = await db.query(
        `SELECT id FROM messages WHERE id = $1`,
        [req.params.id]);

    if (checkRes.rows.length === 0) {
      throw new ExpressError("No such message", 404);
    }

    const result = await db.query(
          `UPDATE messages SET msg=$1 WHERE id = $2,
           RETURNING id, user_id, msg`,
        [req.body.msg, req.params.id]);

    return res.json(result.rows[0]);
  }

  catch (err) {
    return next(err);
  }
});
// end

/** Update message #3: {msg} => {id, user_id, msg} */

router.put("/v3/:id", async function (req, res, next) {
  try {
    const result = await db.query(
          `UPDATE messages SET msg=$1 WHERE id = $2
           RETURNING id, user_id, msg`,
        [req.body.msg, req.params.id]);

    if (result.rows.length === 0) {
      throw new ExpressError("No such message!", 404);
    }

    return res.json(result.rows[0]);
  }

  catch (err) {
    return next(err);
  }
});
// end



module.exports = router;
