const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");


function authenticateJWT(req, res, next) {
  try {
    const payload = jwt.verify(req.body._token, SECRET_KEY);
    req.user = payload;
    return next();
  } catch (e) {
    return next();
  }
}



module.exports = { authenticateJWT, ensureLoggedIn, ensureAdmin };