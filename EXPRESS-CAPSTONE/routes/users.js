/** Routes for users of pg-relationships-demo. */

const db = require("../db");
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");

router.get('/', async (req, res, next) => {
  try{
    const results = await db.query(`
      SELECT id, name, type FROM users`)
      console.log(results)
      return res.json(results.rows)
  } catch(e) {
      return next(e)
  }
})

///  1st way to get 1:M...  ///
router.get("/:id", async function (req, res, next) {
  const { id } = req.params
  try{
    const userRes = await db.query(
      `SELECT name, type FROM users WHERE id = $1`, [req.params.id]);

    const messRes = await db.query(
      `SELECT id, msg FROM messages
        WHERE user_id = $1`, [req.params.id]);

    const user = userRes.rows[0]
    if(userRes.rows.length === 0){
      throw new ExpressError("User not found", 404)
    }
    user.messages = messRes.rows
      return res.json(user)
  } catch(e){
      return next(e)
  }
})

// router.get("/:id", async function (req, res, next) {
//   try {
//     const userRes = await db.query(
//           `SELECT name, type FROM users WHERE id=$1`,
//         [req.params.id]);

//     const messagesRes = await db.query(
//           `SELECT id, msg FROM messages 
//              WHERE user_id = $1`,
//         [req.params.id]);

//     const user = userRes.rows[0];
//     user.messages = messagesRes.rows;
//     return res.json(user);
//   }

//   catch (err) {
//     return next(err);
//   }
// });

/** Get user: {name, type, messages: [{msg, msg}]} */

module.exports = router;