- ‘`this`‘ and 'context' mean the same thing
- `this` can be referred to as directly: this object
- `this` is whatever is left of the dot

## Global object
- ALL FUNCTIONS IN JS ARE CALLED ON SOMETHING
- When you call a function on “nothing”, you actually call it on the global object (all fx are methods)
	- In browser js, that’s typically `window`
	- In Node js, that’s typically `global`
```js
// Thus, the following function in the browser:
whatIsThis();
// Is the same as:
window.whatIsThis();
```

## When you lose your context
- When functions are passed as a callback to another function, particularly for event listeners or setTimout like functions:
	- Javascript determines the context, and `this` risks being lost
- The <u>handoff</u> causes the lost of context.
- There are ways to force the value of `this` to be what we want however.
	- All Functions have a call(), apply(), and bind() method
```js
class Cat {
  constructor(firstName) {
    this.firstName = firstName;
  }

  dance(style = "tango") {
    return `Meow, I am ${this.firstName}` +
        ` and I like to ${style}`;
  }
}

let fluffy = new Cat("Fluffy");
let fDance = fluffy.dance;

fDance("salsa"); // ERROR - b/c `this` context lost
```

## call()
- Invokes function immediately in the context we choose
- First Argument is always the context
- Any additional args are passed to the function being called
```js
// call on fluffy, passing "tango" as arg
fDance.call(fluffy, "tango");
```

## apply()
- Invokes function immediately on a list
- Used to be important as the only reasonable way to call a function when the args were already in a list
- Nowadays just use the spread operator
```js
Math.max(1, 2, 3);       // Math.max expects indiv arguments

let myNums = [1, 2, 3];  // If you already have an array ...

Math.max.apply(null, myNums); // pass that array as indiv arguments
                              // (don't care what "this" is; pass `null`)

Math.max(...myNums); // Now easier to just use the spread operator
```

## bind()
- Returns a brand new function that is <u>permanently</u> bound to the context (and any additional args) it was passed.
- Once bound, IT CANNOT REBIND. Even if passed into bind() again. IT IS PERMANENTLY BOUND.
- First argument: context
- Additional arguments: permanent arguments that will be used in the bound function when invoked. 
Binding context:
```js
fDance("tango");       // error -- this isn't the cat

fDance.call(fluffy, "tango");   // ok but tedious to always do

let betterDance = fDance.bind(fluffy);

betterDance("tango");  // ok -- bound so that `this` is Fluffy -- Forever
```
Binding arguments:
```js
function applySalesTax(taxRate, price) {
  return price + price * taxRate;
}

// "null" for "this" means it doesn't matter what "this" is
const applyCASalesTax = applySalesTax.bind(null, 0.0725);
applyCASalesTax(50);  // 53.63
```
- Binding arguments is usually used when you don’t care what the context is, and null is passed in. But not always (context and args could be bound together)
- Bind() with [[currying]]:
![[oop-this-js-1677515155973.jpeg]]
## Arrow functions and `this`
- Arrow functions don’t make their own `this`
- Instead, they look up to their enclsoing scope for `this` 
- Another reason to use an arrow fx beyond short callbacks is to take advantage of the fact that they don’t create their own `this`

