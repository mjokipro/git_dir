- JavaScript also has one _ternary_ _(“three-way”)_ operator, `? :`
- It’s useful for setting a variable to one of two possible expressions.
```js
let outcome = (timer < 0) ? "game over" : "keep playing";
```
- If your ternary isn’t short and sweet, break it into lines like this:
```js
let outcome = (timer < 0 && numShips > 0)
    ? "game over"
    : "keep playing";
```

### Don’t use with “side-effects”
- It’s best to use this for evaluating expressions, and avoid using it for anything with a “side-effect”:
- ! Ugh so awful don’t do this !
```js
(piece !== null)
  ? winner = "black"
  : getNextMove();
```
- & So much better 
```js
if (piece !== null) {
  winner = "black";
} else {
  getNextMove();
}
```
