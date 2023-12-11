### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript? using Promises, async and await, thenables

- What is a Promise? a placeholder for an object that will one way or another return a value

- What are the differences between an async function and a regular function? async functions are actually placed in a different call stack than normal ones, but upon return, they are placed in normal stack.  they perform a different thread than the main one

- What is the difference between Node.js and Express.js? node is a repl, or environment.  express is the middleware that is used between view funcs that access req, res

- What is the error-first callback pattern? try catch

- What is middleware? refer to above

- What does the `next` function do? acts as control, passes control to next midware func in stack.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc) this will not thread the processes, making them O(1) individual threads.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
