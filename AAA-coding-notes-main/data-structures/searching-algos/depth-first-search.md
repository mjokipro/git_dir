
---
date: 2023-05-31
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---


## PreOrder

```js

//                10
//         6              15
//    3        8               20
//

[10, 6, 3, 8, 15, 20]
```

1. visit node
2. then entire left is done
3. then visit entire right

## PostOrder

```js

//                10
//         6              15
//    3         8               20
//

[3, 8, 6, 20, 15, 10]
```

- & visit a node AFTER looking at entire left AND entire right

- Root is the LAST thing added
- visit all children first

- for code, pretty much stays the same, just change order from pre order to post order

## InOrder


```js

//                10
//         6              15
//    3         8               20
//

[3, 6, 8, 10, 15, 20]
```

- Traverse entire left,
- visit node
- Traverse entire right

from tree, like reading left to right.

- Same thing here with code, once you have one solution, just change order


## When to use one over other?

- InOrder on bst
	- If you want items in order: set of items in order
- PreOrder on bst
	- clone or duplicate tree
	- flatten / freeze it, and then duplicate it later

