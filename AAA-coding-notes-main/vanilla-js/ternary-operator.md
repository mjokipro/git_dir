
- Don’t do this:
```js
currPlayer === 1 ? (currPlayer = 2) : (currPlayer = 1);
```

- Do this instead:
```js
currPlayer = currPlayer === 1 ? 2 : 1;
```

