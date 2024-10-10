var express = require("express");
var mongoose = require("mongoose");
var faker = require("faker");
var path = require("path");
var newfakermodel = require("./newfakermodel");
var app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
const fsP = require("fs/promises");
/** Express app for auth-api. */
// const express = require("express");

// const app = express();

// mongoose
// 	.connect("mongodb://localhost:27017/fakedata", { useNewUrlParser: true })
// 	.then(() => console.log("connected to db"))
// 	.catch((error) => console.log("connection error", error));

    
// Initializing our variables with a different random data each time it is run
var randomName = faker.name.findName(); // Generates a random name
var randomEmail = faker.internet.email(); // Generates a random email
var randomProduct = faker.commerce.productName(); // Generates a random product name
var randomCompany = faker.company.companyName(); // Will give back a random company name
var randomCard = faker.helpers.createCard(); // It's output is a random contact card containing many properties

// Iteration
// This code runs twenty times
// It produces each time different data

const data = []

for (i = 0; i < 20; i++) {
    data.push(randomName)
    //     data.push(randomEmail) 
    //    data.push(randomProduct)
    //    data.push(randomCompany)
    //    data.push(randomCard)
	// console.log(randomName); // Outputs a random name
	// console.log(randomEmail); // Outputs a random email
	// console.log(randomProduct); // Outputs the random product name generated
	// console.log(randomCompany); // Produces a random company name
	// console.log(randomCard); // Gives back a random card
	// console.log(faker.date.past()); // Generates a random past date
}

let content

content = data

async function writeOutput() {
  try {
    await fsP.writeFile("./output.txt", content, "utf8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Successfully wrote to file!");
}


writeOutput()