---
date: 2023-04-03
metadata: true
concepts: ['js', 'promise', 'callbacks', 'async-await']
status: 'post-lecture'
docs: {}
cite: ['rithm']
---

- - -

## Goals

-   Examine callbacks in context of asynchronicity
-   Understand role of promises
-   Understand role of async / await
-   See common patterns and how to solve with async / await

## Callbacks

- A callback is a function passed to another function, for it to call.
- They are used for many things in JS.
	- In JS, functions are first-class objects. This is how we are able to pass them to other functions, because functions can ‘have access’ to act like an object, and still be callable. 
	- This is different from other low level, highly static languages like C, that do not have this feature of callbacks or functions as first-class objects.

### Functional Programming Patterns

- $ Useful for separating processing patterns from business logic.
```js
let paidInvoices = invoices.filter(
  inv => inv.owed <= 0
);
```
– This is really fantastic, and a great place to use a callback.

### Event-Driven Programming

- $ Register a function to be called when an event happens.
```js
$("#myForm").on("submit", sendDataToServer);
```
– This is also a great place to use a callback.

### Asynchronous Code

- ! Call those callbacks when asynchronous operation completes.
```js nums {9, 10, 11}
setTimeout(callMeInASec, 1000);

function callMeWhenResponseArrives (resp) {
	// Do stuff here
}

ajaxLibrary.get("/page", callMeWhenResponseArrives);

// Note that you cannot just assign the results of the request to a variable:
const response = ajaxLibrary.get("/page", callMeWhenResponseArrives);
console.log(response); // Would be an unfulfilled promise
```
– Note, this is possible but not ideal. Callbacks are awkward and hard to follow for async things.

- ~ Note: Some AJAX Libraries Use Callbacks
	- While axios doesn’t allow callbacks as a control-flow possibility for AJAX, other AJAX libraries, like jQuery, do.
	- The .get method shown is common for ajax libraries like jquery and axios.

### Callbacks Will Always Be Useful

- These cases will always be done with callbacks:
	- $  Functional programming patterns
	- $  Event-driven programming
- Let’s talk about third case, for handling asynchronicity

## Callbacks for Asynchronicity

### Why Not This?

```js
// pause for a second
stopHere(1000);  // This does not actually stop the code. JS CANNOT stop - must complete.
// then run this code

// get via AJAX
var response = ajaxLibrary.get("/page");
// now we have response
```

- & JS is _single-threaded_, only one bit of code can run at once
-   If JS _actually_ stopped there, it couldn’t do other things like:
    -   Respond to events (clicks in browser, etc)
    -   Repaint DOM changes in browser
- & By having a callback function for “once-async-thing-is-done”,  JS can finish running your code as quickly as possible.
- This way it can get to those other waiting tasks ASAP.
- **Concurrency:** ability to do things at the same time.
	- & Note: While JS is single-threaded, the *browser* can do multiple things

- ~ Note: Is JavaScript Single Threaded?
	- Largely, yes. JavaScript has “worker threads” that can do some background tasks, but these are limited in their scope. Unlike many other programming languages, JavaScript cannot run multiple top-level threads.

### Callback Patterns

- Sequential callbacks can lead to hard-to-understand code:
```js
ajaxLib.get("/step-1", function f2(resp) {
  ajaxLib.get("/step-2", {resp.body}, function f3(resp) {
    ajaxLib.get("/step-3", {resp.body}, function done(resp) {
      console.log("got final answer", resp.body);
    });
  });
});
```

- This is often called “callback hell” or “pyramid of doom”

- You can flatten that by using non-anonymous functions:
```js
ajaxLib.get("/step-1", doStep2);

function doStep2(resp) {
  ajaxLib.get("/step-2", {resp.body}, doStep3);
}

function doStep3(resp) {
  ajaxLib.get("/step-3", {resp.body}, giveAnswer);
}

function giveAnswer(resp) {
  console.log("got final answer", resp.body);
}
```
- Each function needs to know what to do next;  this makes writing independent functions hard.
- Would be even better to write a controller/conductor function to call each of these in order.
- But it can still be particularly hard to handle errors well for things like this.
	- Therefore, better to use promises.

## Promises

- Promises provide an alternate way to think about asynchronicity.
- & A promise is **one-time guarantee of future value**.
	- This is what axios, and other promise libraries return.

demo/pokemon.js
```js
const url = `${BASE_URL}/1`;
const p = axios({ url });
console.log("first", p);   // Promise {<pending>}
```

-   Promises in JavaScript are *objects*
-   They are native to the language as of ES2015, though used in libaries prior to this point.
	- Async/await were added later as **syntatic sugar**
-   A promise can be in one of three states:
    -   _Pending_ - It doesn’t yet have a value
    -   _Resolved_ - It has successfully obtained a value
    -   _Rejected_ - It failed to obtain a value for some reason
-   The only way to access the resolved or rejected value is to *chain a method* on the end of the promise or *await it*

### .then and .catch

-   Promises provide a *.then* and a *.catch*, which both accept callbacks.
-   The callback to *.then* will run if the promise is resolved, and has access to the promise’s resolved value.
	- & *.then* always returns a promise.
-   The callback to *.catch* will run if the promise is rejected,  and typically has access to some reason behind the rejection.
![](../assets/image/js-async-1680556644033.jpeg)

- ~ Note: **Thenables**
	- When reading about promises, you’ll often see a related term, called a **thenable**. A thenable is simply any object or function that has a then method defined on it.
	- By this definition, all promises are thenables, *but not all thenables are promises*! There are many more specifications that a promise needs to satisfy.
	- Here’s a simple example of a thenable that isn’t a promise:
	  ```js
	let notAPromise = {
	  fruit: "apple",
	  veggie: "carrot",
	  then: () => {
	    console.log("I'm just a random object with a then method.");
	  }
	};
	
	notAPromise.then();
	// "I'm just a random object with a then method."
	```


demo/pokemon.js
```js
const validUrl = `${BASE_URL}/1`;
const futureResolvedPromise = axios({ url: validUrl });

futureResolvedPromise
    .then(console.log)
    .catch(console.warn);
// keeps going ...
// ...
// ...

// NFW to get that answer

// promise to be rejected

const invalidUrl = `http://nope.nope`;
const futureRejectedPromise = axios.get(invalidUrl);

futureRejectedPromise
    .then(console.log)
    .catch(console.warn);


// promise chaining
axios({ url: `${BASE_URL}/1` })
    .then(function f1(r1) {
      console.log(`#1: ${r1.data.name}`);
      return axios({ url: `${BASE_URL}/2` }); // .then ALWAYS returns a promise, so can chain as many together as you'd like/need
    })
    .then(function f2(r2) {
      console.log(`#2: ${r2.data.name}`);
      return axios({ url: `${BASE_URL}/3` }); 
    })
    .then(function f3(r3) {
      console.log(`#3: ${r3.data.name}`);
    })
    .catch(function (err) {
      console.error(err);
```

demo/pokemon.js
```js
const invalidUrl = `http://nope.nope`;
const futureRejectedPromise = axios.get(invalidUrl);

futureRejectedPromise
    .then(console.log)
    .catch(console.warn);


// promise chaining
axios({ url: `${BASE_URL}/1` })
    .then(function f1(r1) {
      console.log(`#1: ${r1.data.name}`);
      return axios({ url: `${BASE_URL}/2` });
    })
    .then(function f2(r2) {
      console.log(`#2: ${r2.data.name}`);
      return axios({ url: `${BASE_URL}/3` });
    })
    .then(function f3(r3) {
      console.log(`#3: ${r3.data.name}`);
    })
    .catch(function (err) {
      console.error(err);
```

### Promise Chaining

-   When calling *.then* on a promise, returns _new_ promise in callback!
    -   Can chain asynchronous operations together with *.then* calls
-   Only need _one_ .catch at the end—don’t have to catch every promise

demo/pokemon.js
```js
axios({ url: `${BASE_URL}/1` })
    .then(function f1(r1) {
      console.log(`#1: ${r1.data.name}`);
      return axios({ url: `${BASE_URL}/2` });
    })
    .then(function f2(r2) {
      console.log(`#2: ${r2.data.name}`);
      return axios({ url: `${BASE_URL}/3` });
    })
    .then(function f3(r3) {
      console.log(`#3: ${r3.data.name}`);
    })
    .catch(function (err) {
      console.error(err);
    });
```

### Benefits of Promises Over Callbacks

-   Easier to write good functions
    -   Each step doesn’t have be tied directly to next step
    -   With promises, *.then* method can just return value for next without having to itself know what comes next
-   Error handling is much easier

## Async / Await

- async / await are language keywords for working with promises.
	- **Syntactic Sugar**: on top of promises - but very sweet sugar 

### async

-   You can declare any function in JavaScript as async
- &  async functions **always** return a promise!
-   In async function, you write code that looks synchronous
    -   But it doesn’t block JavaScript

### await

-   Inside an async function, we can use await
	- Can only use await inside of an async function (and in browser console)
-   await pauses execution
	- but this isn’t how it truly works - it looks like it “pauses”, but doesn’t actually.
-   Can await any promise that you need access to it’s return value (e.g. linking of other async functions!)
-   await “waits” for promise to resolve & evaluates to its resolved value
-   It then resumes execution
-   Think of the await keyword like a pause button - but know that it works differently ‘under-the-hood’

### Example

demo/pokemon.js
```js
async function getPokemonAwait() {
  const r1 = await axios({ url: `${BASE_URL}/1/` });
  // ...
  console.log(`#1: ${r1.data.name}`);

  const r2 = await axios({ url: `${BASE_URL}/2/` });
  console.log(`#2: ${r2.data.name}`);

  const r3 = await axios({ url: `${BASE_URL}/3/` });
  console.log(`#3: ${r3.data.name}`);
}
```

### Error Handling

demo/pokemon.js
```js
async function getPokemonAwaitCatch() {
  try {
    const r1 = await axios({ url: `${BASE_URL}/1/` });
    console.log(`#1: ${r1.data.name}`);

    const r2 = await axios({ url: `${BASE_URL}/2/` });
    console.log(`#2: ${r2.data.name}`);

    const r3 = await axios({ url: `${BASE_URL}/3/` });
    console.log(`#3: ${r3.data.name}`);
  } catch (err) {
    console.warn("Try again later!");
  }
}
```

### Comparing .then/.catch and async/await

-   Under the hood, they do the same thing
-   async/await are the modern improvement
    -   Code can be written more naturally
-   There are a few cases where it’s easy to deal with promises directly

## Asynchronous Patterns

### Many Calls, Do Thing On Return & Don’t Block

- When you need to make several AJAX calls and do things _as they return_:
	- & Order *doesn’t matter*
![](../assets/image/js-async-1680523876877.jpeg)
- Note that the calls to `getAndDo1()`, `getAndDo2()`, and `getAndDo3()` are not awaited - 
	- & This is because the order of their return *does not* matter, and you *don’t* want to block JS from running.
	- Example: inviting 3 friends to dinner.
- Setting this up in this way is also advantageous because if each axios call takes 1 sec, then the entire operation will take 1 second. 

### Many Calls, in Sequence

- When you need to make AJAX calls one-at-a-time, in order:
	- & Order *matters* 
![](../assets/image/js-async-1680523969404.jpeg)
- The calls to axios *are awaited*
	- & Because *order matters* here
	- Example: Can’t move on without checking bank account to make sure there’s enough $ in there first. 

#### Promise.all

-   *Promise.all* accepts an array of promises and returns a _new_ promise
-   New promise will resolve when every promise in array resolves, and will be rejected if any promise in array is rejected

### Promise.allSettled

-   *Promise.allSettled* accepts an <u>array of promises</u> and returns a _new_ promise
	- ~ If return from Promise.allSettled is awaited:
		- The promise resolves after all of the given promises have either fulfilled or rejected, with an array of *objects* that each describes the outcome of each promise.
	- & Note: these *look* like promises, but are *not* actually promises
	- The return *order* also directly maps to the order called (lines 13-15 map from 3-5 below)
- When you need to ask multiple questions, but then want to wait till *all* those questions are answered before continuing

```js nums {11-17}
const GITHUB_BASE_URL = 'https://api.github.com';

let elieP = axios({url:`${GITHUB_BASE_URL}/users/elie`}); // Note naming convention with P
let joelP = axios({url:`${GITHUB_BASE_URL}/users/joelburton`});
let doesNotExistP = axios({url:`${GITHUB_BASE_URL}/user/dsdsdsds`});

let results = await Promise.allSettled([elieP, joelP, doesNotExistP]); // Takes array of promises

console.log(results);

/*
  [
	  {status: 'fulfilled', value: {…}},   // would be elieP
	  {status: 'fulfilled', value: {…}},   // would be joelP
	  {status: 'rejected', reason: Request failed with status code 404...}  // would be doesNotExistP
  ]
*/
```

- *Promise.allSettled* vs. *Promise.all*
	- *Promise.allSettled* 
		- Doesn’t crash the program if a promise fails, allows for partial data:
		- & Best for if one fails, still gets rest of data, and if any failures, gives reason for them.
		- Promise.allSettled is a newer, but more common way. 

- ~ Tip: Promise.all - many calls, in any order, fails fast
	- Make several calls, but they don’t depend on each other. If one fails, the whole thing fails
```js
	let p1 = axios({ url: '/1' });
	let p2 = axios({ url: '/2' });
	let p3 = axios({ url: '/3' });
	
	let resultsPromise = await Promise.all(
	    [p1, p2, p3]);
```

### Many Calls, First One Wins

- When you can get answer from any call; stop after any responds:
![](../assets/image/js-async-1680524464232.jpeg)
-  *Promise.race* accepts an <u>array of promises</u> and returns a _new_ promise
	- ~ If you await this returned promise, will give winning one.
-   This new promise will resolve or reject as soon as _one_ promise in the array resolves or rejects

## Advanced: Building Own Promises

-   You can use Promise with the *new* keyword to make your own promises
-   Unfortunately, the syntax here takes some getting used to
-   Promise accepts a single function (call it _fn_) as an argument
    -   fn accepts two functions as arguments, resolve and reject
    -   Pass resolve a value for the promise to resolve to that value
    -   Pass reject a value for the promise to reject to that value

### Example: setTimeout as a Promise

- Asnyc callbacks can be rewritten as promises:

demo/promiseTimeout.js
```js
function wait(msec) {
  let p = new Promise(
      function (resolve, reject) {
        setTimeout(function () {
          // cause promise to resolve: any await-er will resume
          resolve();

          // we have no error conditions -- if we did, we
          // would call reject() to reject this
        }, msec);
      }
  );
  return p;
}

async function demo() {
  console.log("hi");
  await wait(1000);
  console.log("there");
}
```

## Wrap Up

-   Callbacks will always be useful!
    -   But they’re not the best way to handle asynchronicity
-   Promises improve things
    -   But they’re much easier with async / await for most things
-   Prefer using async / await over promises
    -   Watch out for stuff like:
        ```js
        var resp = await axios({ url: "/1" })
            .then(resp => console.log());
        ```
    -   What is this awaiting?! What is resp?!
        - resp will be the result of _await_ for *the entire line*–
            - the axios call is resolved by the arrow function, which does console log the error, but returns a promise of undefined— 
                - which is then awaited and becomes the resolution of undefined— 
                    - which is assigned to resp
                    - Phew.
- ! In other words: don’t mix await and .then. It almost certainly isn’t useful. 
- $ Just await things.
