let resolvedValue = "hello!";
let p1 = Promise.resolve(resolvedValue);
p1; // Promise {<resolved>: "hello!"}
p1 === value; // false

let rejectedValue = "sorry :(";
let p2 = Promise.reject(rejectedValue);
p2; // Promise {<rejected>: "sorry :("}
p2 === value; // false

let mockAjaxRequest = new Promise(function(resolve, reject) {
  let probSuccess = 0.5;
  let requestTime = 1000;

  // We mock a network request using a setTimeout.
  // The request takes requestTime milliseconds.
  // Afterwords, the promise is either resolved with data
  // or rejected with a timeout message,
  // based on whether randomNum is less than probSuccess.
  setTimeout(function() {
    let randomNum = Math.random();
    if (randomNum < probSuccess) {
      let data = "here's your data!";
      resolve(data);
    } else {
      reject("Sorry, your request failed.");
    }
  }, requestTime);
});

mockAjaxRequest
  .then(data => console.log(data))
  .catch(err => console.log(err));

function myAsyncFunction() {
  // return a new Promise
  return new Promise((resolve, reject) => {
    /*

      DO ASYNC STUFF HERE

    */

    // if it succeeds, call the resolve callback
    resolve(/* success value*/);

    // if it fails, call the reject callback
    reject(/* fail value*/);
  });
}
// end of pattern example
