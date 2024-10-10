function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}

const ExpressError = require("./expressError");

function onlyAllowElie(req, res, next) {
  try {
    if (req.params.name === "Elie") {
      return next();
    } else {
      throw new ExpressError("Unauthorized", 401);
    }
  } catch (err) {
    return next(err);
  }
}

module.exports = { logger, onlyAllowElie };
