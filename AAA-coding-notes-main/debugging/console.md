- You can filter which console statements appear in your browser’s console with Default levels menu. So, you can hide the less-critical .debug stuff and only show the more important .log stuff. Note that .debug is hidden by default — you’ll need to enable that with the Default levels dropdown.
- Keep your console statements in → computer can remove them later
- Use console <u>before</u> its a problem

## console.log()
-   **Always** include a message
    -   `console.log("myFunction x=", x);`
    -   `console.log("myFunction usernames=", usernames);`
-   Use multiple parameters instead of +
    -   `console.log("a=", a, "b=", b);`
-   The most helpful log is sometimes the simplest one:
    -   `console.log("game.js loaded");`
    -   `console.log("myFunction ran");`

## console.debug()
- Appears brightly colored in console

## console.info()
- More important, might help understand the flow of things

## console.warn()
- Even more important, Appears bright yellow in console

## console.error()
- Looks like an error - Appears bright red in console and emphasizes the danger

## console.assert(check,msg)
- You can use console.assert(check, msg) to highlight problems:
```js
function getHighestGrade(tests) {
  for (let test of tests) {
    console.assert(test <= 100, test);
    // ...
  }
}
```



