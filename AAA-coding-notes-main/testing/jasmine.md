- _Jasmine_ is a popular JavaScript testing framework

## Why test?
- & Tests make it explicit what a function should do
	- easier to read and understand tests than to read all of someone else’s code
-   Manually testing software is boring
    -   So we tend to not re-run things that “work”
    -   And therefore don’t notice when they break
-   Tests often clarify expectations of a function
    -   What should legal input/output be?
-   Tests are often a great way to understand what code does
-   It’s a core skill for professional devs

## set-up
- Create an html file for your tests, and add the following code:
	- (change names for files as needed of course)
```html
<!doctype html>
<html>
<head>
<title>Taxes Tests</title>

<!-- include CSS for Jasmine -->
<link rel="stylesheet"
  href="https://unpkg.com/jasmine-core/lib/jasmine-core/jasmine.css" />
</head>
<body>

<!-- include JS for Jasmine -->
<script src="https://unpkg.com/jasmine-core/lib/jasmine-core/jasmine.js"></script>
<script src="https://unpkg.com/jasmine-core/lib/jasmine-core/jasmine-html.js"></script>
<script src="https://unpkg.com/jasmine-core/lib/jasmine-core/boot0.js"></script>
<script src="https://unpkg.com/jasmine-core/lib/jasmine-core/boot1.js"></script>

<!-- include your JS & test file -->
<script src="taxes.js"></script>
<script src="taxes.test.js"></script>
</body>
</html>
```

- Write your js code that will be tested
```js
function calculateTaxes(income) {
  if (income > 30000) {
    return income * 0.25;
  } else {
    return income * 0.15;
  }
}

console.log(calculateTaxes(500))
```

- Create a js file for your javascript tests
	- naming convention is `whatIsBeingTested.test.js`
```js
it('should calculate lower-bracket taxes', function () {
  expect(calculateTaxes(10000)).toEqual(1500);
  expect(calculateTaxes(20000)).toEqual(3000);
});

it('should calculate higher-bracket taxes', function () {
  expect(calculateTaxes(50000)).toEqual(12500);
  expect(calculateTaxes(80000)).toEqual(20000);
});
```

## tests explained
- `it()` function takes two arguments:
	- First, string describing what the test is testing for
	- Second, a “test case” function that contains any ‘normal’ code plus ‘expectations’
- ‘expectations’ follow this format:
```js
expect(someValue).someMatcher(...)
```

### Matchers
- `.toEqual(obj)`
	- Has the same values (eg, different lists with same values match)
	- Different from triple equals in js 
		- `[123] === [123]` → True
- `.toBe(obj)`
	- Is the same object (eg, different lists with same items don’t)
	- Same as triple equals in js
		- `[123] === [123]` → False
- `.toContain(obj)`
	- Does object/array contain this item?
- `.not.`
	- Add before matcher to invert (eg `expect(...).not.toEqual(7)`)

## What To Test
-   <u>Test every function </u>in at least one way
-   Think about “edges”
    -   What if the list were empty?
    -   What about non-integer numbers?
    -   What if the file can’t be found?
    -   Is the first case/last case handled differently?

### Testable Code
- Write code that is easier to test!
- & Better to have MORE functions and SMALLER functions
	- easier to test (and debug!)
- Don’t mix logic & UI in a function
- Don’t wait too long to write tests
	- Write them as you go