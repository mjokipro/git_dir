
---
date: 2023-05-30
metadata: true
concepts: ['data-structures', 'recursion']
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Recursion

- Having a function call itself
- Also: a very powerful programming technique
- Also: a popular interview question topic
- Sets up a slightly smaller world
- Simplifies the problem just slightly/ Breaks apart the problem just slightly

## The Tiniest Review

### Functions Calling Functions

```js
function a() {
  console.log("hello");
  b();
  console.log("coding");
}

function b() {
  console.log("world");
  c();
  console.log("love");
}

function c() {
  console.log("i");
}
```

![](../assets/image/dsa-recursion-1685463960544.jpeg)
→ “hello world i love coding”

- Remember, when you call a function, you “freeze” where you are until that function returns, and then continue where you left off.
- So a prints `hello`, calls b which prints `world`, calls c which prints `i` and returns back to b which then prints `love` which then returns back to a which prints `coding`.

## Loops and Recursion

- Any loop can be written instead with recursion
- Any recursion can be written instead with a loop
	- … but often, one way is easier for a problem

### Count to 3

![](../assets/image/dsa-recursion-1685464031040.jpeg)

### Call Frames / Stack

```js
function count(n=1) {
  if (n > 3) return;

  console.log(n);
  count(n + 1);
}

count();
```

![](../assets/image/dsa-recursion-1685464109257.jpeg)

- n = 1 in green frame, n = 2 in orange frame, n = 3 in red frame, etc.

### More Counting

```js
function count(n=1) {
  if (n > 3) return;

  console.log(n);  // Work going up the mountain (before call to self)
  count(n + 1);
  console.log(n);  // Work while going down the mountain (after call to self)
}

count();
```

![](../assets/image/dsa-recursion-1685464132481.jpeg)

### Loops versus Recursion

![](../assets/image/dsa-recursion-1685464166434.jpeg)

Using a while loop:
```js
function count() {
  let n = 1;

  while (n <= 3) {
    console.log(n);
    n += 1;
  }
}

count();
```

Using recursion:
```js
function count(n=1) {
  if (n > 3) return;

  console.log(n);
  count(n + 1);
}

count();
```

Which do you prefer?

## Requirements

### Base Case

- & Your base case is a real and valid case, with a real and valid answer

```js nums {2}
function count(n=1) {
  if (n > 3) return;

  console.log(n);
  count(n + 1);
}
```

- Every recursive function needs a base case
    - How do we know when we’re done?
- Often a base case is a **“degenerate case”**.
	- concat(`[1, 2, 3]`) →
	- “1” + concat(`[2, 3]`) →
	- “1” + “2” + concat(`[3]`) →
	- “1” + “2” + “3” + concat(`[]`) ← **degenerate: empty array**
- ~ **Degenerate Cases**
	- A “degenerate case” is one that is so reduced that it’s fundamentally different from the others and would need to be treated differently.
		- Obviously the ‘end of the world’
	- Consider counting up to 3 recursively:
	```js
	function count(n=1) {
	  if (n > 3) return;
	
	  console.log(n);
	  count(n + 1);
	}
	```
	- Here, our base case is “when we hit 3, don’t keep recursing”. This is a base case, but it’s not “degenerate” — we _could_ keep counting up after 3; there’s nothing preventing us from doing so besides our goal to stop.
	- Compare this with finding the length of a list recursively:
	```js
	function lenlist(nums) {
	  if (nums[0] === undefined) return 0
	
	  return 1 + lenlist(nums.slice(1));
	}
	```
	- Here, our base case is “the length of an empty list is 0, so return that and don’t recurse”. This base is “degenerate” — there’s no possible way for us to find the length of a list with -1 items in it! It wouldn’t even be possible for us to keep recursing; this base case is a hard limit on what’s possible.
	- Not all recursive problems have a degenerate base case, but thinking about if one is possible is often helpful in figuring what your base case is and how the recursion should work.

### No Base Case

```js
function count(n=1) {
  console.log(n);
  count(n + 1);
}

count();
```

- Stack Overflow occurs! Maximum Call Stack reached!

### Explicit vs. Hidden Base Cases

Explicit:
```js
function count(n=1) {
  if (n > 3) return;

  console.log(n);
  count(n + 1);
}
```

Hidden:
```js
function count(n=1) {
  if (n <= 3) {
    console.log(n);
    count(n + 1);
  }
}
```

- Both are base cases, but Which do you prefer?

### Progress

```js nums {5}
function count(n=1) {
  if (n > 3) return;

  console.log(n);
  count(n + 1);
}
```

- Need to be moving toward your base case.

## Returning Data

### Finding Sum of List

“Return sum of list using recursion”

- What’s our base case?
    - An empty list has sum = 0!

example
```js
function sum(nums) {
  if (nums.length === 0) return 0;

  return nums[0] + sum(nums.slice(1));
}

sum([1, 2, 4, 5]);
```

- Recursion:
	- Handling one case, then trusting that the next case will work.
	- Handle the case of empty list
		- Base case: legit and real: what’s the sum of an empty list? 0
		- base case is a legitimate question and should have a legit answer
	- Handle the case of only 1 item in a list
		- What’s the sum of 1 item in a list?
			- That item, but also need to make progress toward base case
			- So, `myList[0]` + the rest of the list
	- Test out your base case
		- if your base case is wrong, you’ll never get the right answer
		- make that base case tangible
		- your base case is a legit question with the right answer
		- call it, in the simplest scenario
			- call it with an empty list, prove that it works
	- Test out ONE way from the base case

![](../assets/image/dsa-recursion-1685467891870.jpeg)

## List Doubler

### The Problem

“For every number in array, print the value, doubled”

```js
data = [ 1, 2, 3 ]  //  => 2 4 6
```

```js
function doubler(nums) {
  for (let n of nums) {
    console.log(n * 2);
  }
}
```

### The Challenge

- Some items can be lists themselves
- We want to “flatten” them and still print double
```js
data = [ 1, [2, 3], 4 ]  //   => 2 4 6 8
```

```js
function doubler(nums) {
  for (let n of nums) {
    if (Array.isArray(n)) {
      for (let o of n) console.log(o * 2);
    } else {
      console.log(n * 2);
    }
  }
}
```

### Oh No!

- Some of _those_ items can be lists!

```js
data = [ 1, [2, [3], 4], 5 ]  //   => 2 4 6 8 10
```

```js
function doubler(nums) {
  for (let n of nums) {
    if (Array.isArray(n)) {
      for (let o of nums) {
        if (Array.isArray(o)) {
          for (let p of o) console.log(p * 2);
        } else {
          console.log(o * 2);
        }
      }
    } else {
      console.log(n * 2);
    }
  }
}
```

### Arbitrary Depth with Loop

```js
let data = [ 1, [2, [3], 4], 5 ]  //   => 2 4 6 8 10

function doubler(nums) {
  let stack = nums.reverse();

  while (stack.length > 0) {
    let n = stack.pop();
    if (Array.isArray(n)) {
      // If array, add it to stack, reversed
      for (let inner of n.reverse()) {
        stack.push(inner);
      }
    } else {
      console.log(n * 2);
    }
  }
}
```

- It works, but it’s pretty hairy!
- This solution uses a data structure called a “stack”, adding new work to the end and popping them off the end.
- This code may be worth study, even though this problem is more easily solved with recursion.

### Non-Recursively

![](../assets/image/dsa-recursion-1685469755520.jpeg)

### Recursively

![](../assets/image/dsa-recursion-1685469775893.jpeg)

```js
data = [ 1, [2, [3], 4], 5 ]

function doubler(nums) {
  for (let n of nums) {
    if (Array.isArray(n)) {
      doubler(n);
    } else {
      console.log(n * 2);
    }
  }
}
```

![](../assets/image/dsa-recursion-1685469808406.jpeg)

- May end up being the case where it really turns out more like a mountain range:
![|300](../assets/image/dsa-recursion-1685470564257.jpeg)

## Recognizing Recursion

### Filesystems

![](../assets/image/dsa-recursion-1685470072011.jpeg)

### Fractals

![_images/fractal.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/dsa-recursion/handout/_images/fractal.png)

- Many things in nature is fractal

### Parsing

```
1 × ( 2 + 3 × ( 4 + 5 × 6 ) + 7 )
```

- This is a particularly good, hard exercise to give yourself.
	- Need to solve the inner parenthesis before solving the next parenthesis, etc.
	- Also, the whole thing is arithematic expression
		- As is the middle parenthesis
			- As is inner parenthesis
- How to solve an arithematic expression using JS?
	- How can you parse an expression like this and get a numerical answer



### Nested Data

```html
<html>
  <head>
    <title>Title</title>
  </head>
  <body>
    <h1>Body</h1>
    <ul>
      <li>One</li>
      <li>Two
        <ul>
          <li>Two A</li>
          <li>Two B</li>
        </ul>
      </li>
    </ul>
  </body>
</html>
```

- elements contain other elements, etc.

## Runtime

- What’s the runtime?

```js
function sum(nums) {
  if (nums.length === 0) return 0;

  return nums[0] + sum(nums.slice(1));
}
```
- O(n ^ 2) — we keep making new lists!
- It also has O(n ^ 2) _runspace_ — keeping all lists in memory!

### Improving Runtime

- Often, you can keep track of position in array, rather than slice:
```js
function sum(nums, i=0) {
  if (i === nums.length) return 0;

  return nums[i] + sum(nums, i + 1);
}
```
- Now runtime and runspace are O(n)

### Accumulating Output

- Given array of numbers, return even numbers
```js
function evens(nums, i=0) {
  if (nums.length === i) return [];

  if (nums[i] % 2 === 0) {
    return [nums[i], ...evens(nums, i +1)];
  }

  return evens(nums, i + 1);
}
```
![](../assets/image/dsa-recursion-1685485926382.jpeg)
- Back to O(n ^ 2) — making all those lists!

- Can solve with “helper recursion”:
```js
function evens(nums) {
  let out = [];

  function _evens(nums, i) {
    if (nums.length === i) return;
    if (nums[i] % 2 === 0) out.push(nums[i]);
    _evens(nums, i + 1);
  }

  _evens(nums, 0);
  return out;
}
```
- Back to O(n)

### Accumulators

Often, can also solve with “accumulator”:

```js
function evens(nums, out=[], i=0) {
  if (nums.length === i) return out;

  if (nums[i] % 2 === 0) out.push(nums[i]);

  return evens(nums, out, i + 1);
}
```

Back to O(n)

- ~ Note
	- “Tail Call Optimization”
	- In some languages, this can be “tail-call optimized”, where the language can rewrite a recursive approach into a faster-performing loop approach during compilation or execution. This is an advanced but interesting feature, and you can learn more about it if you’re interested at [Advanced: Tail Call Optimization](http://2ality.com/2015/06/tail-call-optimization.html)

- & Note: Best to do this without the helper way to understand recursion in a deeper way

## Resources

[How Recursion Works](https://medium.freecodecamp.org/how-recursion-works-explained-with-flowcharts-and-a-video-de61f40cb7f9)

[Rithm Lecture on Recursion](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/dsa-recursion/handout/index.html?AWSAccessKeyId=AKIA6I7NF475LYNA7YJL&Signature=zKrkZ4zlJTCVuxsuk70ODiStcZ4%3D&Expires=1685507069.)


## Check in Notes

- LinkedList is an inherently recursive data structure
	- degenerate: this is the edge of the world
	- if X.length === 0
	- if x === 0
	- if node === null

![](../assets/image/dsa-recursion-1685479175142.jpeg)

- rprintLL(node)
![](../assets/image/dsa-recursion-1685479514180.jpeg)

- sumLL
base case: when you have 
![](../assets/image/dsa-recursion-1685479334416.jpeg)

## 2nd check in

![](../assets/image/dsa-recursion-1685484642441.jpeg)

![](../assets/image/dsa-recursion-1685484660202.jpeg)


Function signature:
- function name
- what does it take
- what does it return



## Sample problem: getLastCharacter

Huse:
![](../assets/image/dsa-recursion-1685550168082.jpeg)

```js
let str = "hello";

function getLastCharacter(str){
  console.log("str = ", str);
  if (str === "") return "";
   
  
  return str[1] === undefined ? str[0] : getLastCharacter(str.slice(1));
}

getLastCharacter(str);
```
