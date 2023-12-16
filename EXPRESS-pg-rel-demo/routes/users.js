/** Routes for users of pg-relationships-demo. */

const db = require("../db");
const express = require("express");
const router = express.Router();


/** Get users: [user, user, user] */

router.get("/", async function (req, res, next) {
  try {
    const results = await db.query(
          `SELECT id, name, type FROM users`);

    return res.json(results.rows);
  }

  catch (err) {
    return next(err);
  }
});

/** Get user: {name, type, messages: [{msg, msg}]} */

router.get("/:id", async function (req, res, next) {
  try {
    const userRes = await db.query(
          `SELECT name, type FROM users WHERE id=$1`,
        [req.params.id]);

    const messagesRes = await db.query(
          `SELECT id, msg FROM messages 
             WHERE user_id = $1`,
        [req.params.id]);

    const user = userRes.rows[0];
    user.messages = messagesRes.rows;
    return res.json(user);
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;