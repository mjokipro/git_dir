const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const jsonschema = require("jsonschema");
const bookSchema = require("../schemas/bookSchema.json")

// VERSION WITHOUT ANY REAL VALIDATION...
// router.post("/", function (req, res, next) {
//   const bookData = req.body.book;

//   if (!bookData) {
//     // pass a 400 error to the error-handler
//     let error = new ExpressError("Book data is required", 400);
//     return next(error);
//   }

//   // (not implemented) insert book into database here

//   return res.json(bookData);
// });

router.post("/", function (req, res, next) {
  const result = jsonschema.validate(req.body, bookSchema)
  if(!result.valid){
    // pass validation errors to error handler
    // (the "stack" key is generally the most uselul)
    console.log(result)
    const listE = result.errors.map(e => e.stack)
    let e = new ExpressError(listE, 400)
      return next(e)
  }
  // At this point in code, we know we have valid payload.
  console.log(result)
  const { book } = req.body
    return res.json("That is valid")
});


module.exports = router;
