function greet() {
  console.log("HI!! I LOVE YOU!")
}

function diss() {
  console.log("you are the worst :(")
}

// FUNCTIONS AS ARGUMENTS
function repeatThreeTimes(func) {
  func();
  func();
  func();
}

function repeat(num, func) {
  for (let i = 0; i < num; i++) {
    func();
  }
}


// STORING FUNCTIONS IN VARIABLES
let funcs = [greet, diss]

const myFunc = function add(x, y) {
  return x + y;
}

// FUNCTIONS AS RETURN VALUES
function giveBirth() {
  console.log("GIVING BIRTH!!!")
  return function cry() {
    return "WAAAAAHHHH"
  }
}

function makeMultiplyFunc(num) {
  return function mult(x) {
    return num * x;
  }
}



//JS IS SINGLE THREADED!

// greet();
// alert("I AM ALERT!")
// diss();

// SET TIMEOUT
// greet();
// setTimeout(function () {
//   diss();
//   diss();
//   diss();
// }, 1000);
// greet();

setTimeout(function () {
  console.log("MEOW")
  console.log("WOOOF")
  console.log("OINK")
}, 3000);

// ANONYMOUS FUNCTIONS

// function doTwice(func) {
//   func();
//   func();
// }

// doTwice(function () {
//   console.log("STOP BOTHERING ME!");
//   console.log("PLEASE GO AWAY!")
// })
// const id = setInterval(diss, 2000);

// const printOne = function () {
//   console.log(1)
// }

// const funcs = [function () { }, function () { }]







