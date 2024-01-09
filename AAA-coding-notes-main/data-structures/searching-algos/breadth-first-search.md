
---
date: 2023-05-31
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

```js
//             10
//         6        15
//       3   8         20

queue: [10]
visited: []

queue: [6, 15]
visited: [10]

queue: [15, 3, 8]
visited: [10, 6]

queue: [3, 8, 20]
visited: [10, 6, 15]

queue: [8, 20]
visited: [10, 6, 15, 3]

queue: [20]
visited: [10, 6, 15, 3, 8]

queue: []
visited: [10, 6, 15, 3, 8, 20]
```
