## Likely use cases
- To build empty arrays
```js
Array.from({ length: 5 });
// [undefined, undefined, undefined, undefined, undefined]
```
- Convert DOM array-like objects that you wish were arrays
```js
// querySelectorAll returns a NodeList...
let paragraphsNodeList = document.querySelectorAll('p');

// a NodeList is NOT an Array!
Array.isArray(paragraphsNodeList);  // false

let paragraphs = Array.from(paragraphsNodeList);
Array.isArray(paragraphs);  // true
```
- Combining with Set to remove duplicates from an array
```js
const nums = [1, 2, 3, 4, 2, 3, 1];
const unique = Array.from(new Set(nums));
```

## Under the hood
- Array.from() turns these items into an actual Array.
- Works by looking for anything with a length, then iterates over those items and pushes them into an Array
- & Note that Array.from() used less often b/c it can mostly be replaced by the spread operator
