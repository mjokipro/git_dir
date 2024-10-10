
## Javascript Test Template
```js
"use strict";

// TODO: Add tests
describe("#functionName", function () {
	it("", function () {
		expect().toEqual();
	});

	it("", function () {
		expect().toEqual();
	});
});
```

## HTML File Test Template
```html
<!doctype html>
<html>
<head>
<title>FILENAME Tests</title>

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
<script src="FILENAME.js"></script>
<script src="FILENAME.test.js"></script>
</body>
</html>
```
