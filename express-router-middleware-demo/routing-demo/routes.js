/* Routes for sample app. */

const express = require("express");
const router = new express.Router();

const users = [];

/** GET /users: get list of users */

router.get("/", function(req, res) {
  return res.json(users);
});

/** DELETE /users/[id]: delete user, return status */

router.delete("/:id", function(req, res) {
  const idx = users.findIndex(u => u.id === +req.params.id);
  users.splice(idx, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;
