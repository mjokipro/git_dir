// 1.)  countdown
setTimeout(function() {
   console.log("4");
   console.log("3");
   console.log("2");
   console.log("1");
}, 4000);

function greet() {
   console.log("4");
   console.log("3");
   console.log("2");
   console.log("1");
}

setTimeout(greet, 4000);

// 2.)  randomGame
let count = 0;
let num = 0;
let timerId = setInterval(randomGame, 1000);

function randomGame(func) { 
  num = Math.random();
    count++;
      isGreater();
   
}

const isGreater = function() {
  if(num > .75) {
    clearInterval(timerId);
      console.log(count);
  }
}

1.)  setTimeout() example:

setTimeout(function () {
   console.log("4")
   console.log("3")
   console.log("2")
   console.log("1")
 }, 4000);

 setTimeout();
