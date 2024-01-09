- JavaScript has three common logical operators: `||`, `&&`, and `!`

## Binding of ! operator
- `!` binds very closely, so `! a || b` means “invert a-truth, then OR with b”
	- To spread NOT across elements, do it like `! (a || b)`

### AND and OR

- These test “truthy” or “falsy” expressions, not just true and false
	- Falsy values:  `0`  `undefined`   `null`   `NaN`   `""`
	- An excellent resource on truthy/falsy: [https://www.sitepoint.com/javascript-truthy-falsy/](https://www.sitepoint.com/javascript-truthy-falsy/)
- They evaluate to the `determining subpart`
	- The `determining subpart` is the part that “figured out” whether the expression is truthy or falsy
	- The first item that determines the expression. (this differs between AND and OR)
```js
let x = 42
let y = 0;

let a = x || y;   // a === 42  // Since x is truthy, OR is used, x determines the expression
let b = x && y;   // b === 0   // Since y is falsy, AND is used, y determines the expression
let c = 8 && y && x // c === 0 // Since y is falsy, AND is used, y determines the expression
```


