const Router = require("express").Router;
const router = new Router();

const Message = require("../models/message");
const {ensureLoggedIn} = require("../middleware/auth");
const ExpressError = require("../expressError");

/** get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    // let username = req.user.username;
    let msg = await Message.get(req.params.id);

    // if (msg.to_user.username !== username && msg.from_user.username !== username) {
    //   throw new ExpressError("Cannot read this message", 401);
    // }

    return res.json({ msg});
  }

  catch (err) {
    return next(err);
  }
});

router.get("/", async function (req, res, next) {
  const q = req.query;
  // arrive as strings from querystring, but we want as int/bool
  if (!q) return

  try {
    // const validator = jsonschema.validate(q, postSearchSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const messages = await Message.getAll(q);
    return res.json({ messages });
  } catch (err) {
    return next(err);
  }
});

// router.get("/", ensureLoggedIn, async function (req, res, next) {
//   try {



//     let messages = await Message.getAll({
//       from_user: req.user.username,
//       to_user: req.body.to_user,
//       body: req.body.body
//     });

//     const messages = await Message.getAll()

//     return res.json({messages: messages});
//   }

//   catch (err) {
//     return next(err);
//   }
// });

/** post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    let msg = await Message.create({
      from_username: req.user.username,
      to_username: req.body.to_username,
      body: req.body.body
    });

    return res.json({message: msg});
  }

  catch (err) {
    return next(err);
  }
});


/** mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post("/:id/read", ensureLoggedIn, async function (req, res, next) {
  try {
    let username = req.user.username;
    let msg = await Message.get(req.params.id);

    if (msg.to_user.username !== username) {
      throw new ExpressError("Cannot set this message to read", 401);
    }
    let message = await Message.markRead(req.params.id);

    return res.json({message});
  }

  catch (err) {
    return next(err);
  }
});


module.exports = router;