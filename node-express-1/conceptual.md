### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
# Using promises with(resolve/reject) & Async/Await

- What is a Promise?
# A method for handling asynchronous code through either completion or failure

- What are the differences between an async function and a regular function?
# An asynchronous function operates through the event loop, yielding control of the code block until the implicit promise is returned.  Structurally, they are similar to most functions with the exceptino of the Asyn/Await prefixes.

- What is the difference between Node.js and Express.js?
# Node is a runtime environment built on the Chrome engine, while express is a library used to create servers for full stack applications in pure javascript

- What is the error-first callback pattern?
# Error first is structuring your code to always try/catch OR else/if for an error when executing a route, middleware, or function.

- What is middleware?
# Middleware are functions/methods/classes that interact in between the beginning of a server request/call and the completion of that call. An intermediary betwen endpoints

- What does the `next` function do?
# The next function yields control of the current route to the next available route/middleware/router or error handler.

- What does `RETURNING` do in SQL? When would you use it?
# Signifies that a query has been resolved.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
# Code is not modular, hard coded.  Code should reflect a function that takes a list of names as a parameter.  Then it should make ONE asynchronous call inside a loop. IE get a list of names passed into the function, then iterate through each element of the array, making an ansychronous call, and popping that into a list.  Then return the full list at the end.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
