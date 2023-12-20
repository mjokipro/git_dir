const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json");

router.post("/with-validation", function(req, res, next) {
  const result = jsonschema.validate(req.body, bookSchema);

  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    let listOfErrors = result.errors.map(error => error.stack);
    let error = new ExpressError(listOfErrors, 400);
    return next(error);
  }

  // at this point in code, we know we have a valid payload
  const { book } = req.body;
  return res.json(book);
});
// end

router.post("/", function(req, res, next) {
  const bookData = req.body.book;

  if (!bookData) {
    // pass a 400 error to the error-handler
    let error = new ExpressError("Book data is required", 400);
    return next(error);
  }

  // (not implemented) insert book into database here

  return res.json(bookData);
});
// end

module.exports = router;
