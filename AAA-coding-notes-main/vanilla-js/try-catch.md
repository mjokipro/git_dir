## Error handling with try-catch
- JavaScript can handle many errors in code, and is actually unusual in how few errors it throws compared to other languages
- To account for this, we could have many conditionals to check that we have a ‘legal’ case before running the code, but it’s often easier to write something simple, and then write code to handle the errors 
```js
try {
  eaten += garden[y][x];  // might be out-of-bounds
} catch (err) {
  // can now print `err`, or do something different
  eaten = 0;
}
```

- You can also throw errors to indicate a problem:
```js
function getHighestGrade(tests) {
  if (tests.length === 0) {
    throw new Error("No tests provided!");
  }
  // ... rest of code follows ...
}
```
This is often much clearer than returning a “magic” value, like `-1` or undefined, particularly for writing code on a team.

