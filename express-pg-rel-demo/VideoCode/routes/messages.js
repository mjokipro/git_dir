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
      ON  mt.tag_code = t.code
      WHERE m.id = $1`, [req.params.id])
    if (results.rows.length === 0) {
      throw new ExpressError(`Message not found with id ${req.params.id}`, 404)
    }
    const { id, msg } = results.rows[0];
    const tags = results.rows.map(r => r.tag);
    return res.send({ id, msg, tags })
  } catch (e) {
    return next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const result = await db.query(
      `UPDATE messages SET msg = $1 WHERE id = $2
        RETURNING id, user_id, msg`,
      [req.body.msg, req.params.id])
    if (result.rows.length === 0) {
      throw new ExpressError("Message not found", 404)
    }
    return res.json(result.rows[0])

  } catch (e) {
    return next(e)
  }
})





module.exports = router;