var mongoose = require("mongoose");

// Add the following columns in it and their datatypes
var fakerSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	phonenumber: String,
	city: String,
	state: String,
	country: String,
});

// Require it as the output
module.exports = mongoose.model("fakerCollection", fakerSchema);