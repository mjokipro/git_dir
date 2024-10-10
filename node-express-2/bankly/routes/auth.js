/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');


/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/register', async function(req, res, next) {
  try {
    //bug fix, allow user to register
    const { username, password, first_name, last_name, email, phone, isAdmin } = req.body;
    let user = await User.register({username, password, first_name, last_name, email, phone, isAdmin});
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); 

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    // await user auth
    let user = await User.authenticate(username, password);
    const token = createTokenForUser(user.username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); 

module.exports = router;
