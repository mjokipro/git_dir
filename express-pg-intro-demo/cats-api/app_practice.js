const express = require("express");
const app = express();
const ExpressError = require("./expressError");

// Parse request bodies for JSON
app.use(express.json());