const db = require("../db");
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");

router.get('/:id', async (req, res, next) => {
  try {
    const results = await db.query(`
      SELECT m.id, m.msg, t.tag
      FROM messages AS m 
      LEFT JOIN messages_tags AS mt
      ON m.id = mt.message_id
      LEFT JOIN tags AS t
      ON mt.tag_code = t.code
      WHERE m.id = $1
    `, [req.params.id])
    if(results.rows.length === 0) {
      throw new ExpressError(`Message not found: ${req.params.id}`, 404)
    }
    const { id, msg } = results.rows[0]
    const tags = results.rows.map(r => r.tag)
      return res.json({id, msg, tags: [tags]})       
  } catch(e){
      return next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try{
    const results = await db.query(`
    UPDATE messages SET msg = $1
    WHERE id = $2
    RETURNING id, user_id, msg
    `, [req.body.msg, req.params.id])

    if(results.rows.length === 0){
      throw new ExpressError("Message not found.", 404)
    }
      return res.json(results.rows[0])
  } catch(e){
      return next(e)
  }
})

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



module.exports = router;