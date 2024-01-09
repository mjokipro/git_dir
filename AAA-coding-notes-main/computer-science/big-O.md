_Big O Notation allows us to measure how code performs as input grows._

#questions Does big-O get used to compare files/larger sets of data beyond functions/algos?

## What is big-O?
-   Imagine we have multiple implementations of the same function
	- *Function that accepts a string and returns reversed copy*
- How can we determine which one is the “best?”
- It’s important to discuss performance under scale
- Useful for discussing trade-offs between different approaches
- When code slows, identifying inefficient parts helps find pain points
- Which is better?
	-   Faster?
	-   Less memory-intensive?
	-   More readable?
	-   Let’s focus on _scale_

### Counting operations
- Timers for measuring “how long” run into problems b/c constant variability of different machines recording diff times, same machine recording diff times, and not precise enough, particularly for fast algo’s
- Instead, count the number of operations
- But, counting each operation is hard, so instead, we focus on the trend, and how function responds as the size of n grows.

## Big-O Complexities
![[big-O-1677250025039.jpeg]]
- More graphical demonstration: https://rithmschool.github.io/function-timer-demo/

### Best to Worst Complexities:
- **O(1) Constant**
- **O(log n) Logarithmic**  
- **O(n) Linear**
- **O(n log n) Linear-logarithmic**
- **O(n^2) Quadratic**
- **O(2 ^ n) Exponential**
- **O(n!) Factorial**

![[big-O-1677250533270.jpeg]]

### Analogies
- Constant time complexity is like driving to costco to buy as much pasta as you could ever need
- Linear time complexity is like making that pasta yourself
- Quadratic time complexity is like having each of your friends meet each other 1:1 for coffee vs constant time complexity would be hosting a big dinner party

## Time Complexity
- For determining time complexity:
	- Constants do <u>not</u> matter
		- O(5) → O(1)
		-   O(10n2) → O(n2)
	- Smaller terms do <u>not</u> matter
		- O(n2 + n + 5) → O(n2)
	- Always make sure you can answer: **what is** n?
		- In the sense that you should be able to name n in terms of:
			- number of customers, how many books, etc.

### Common Algo Runtimes
- Binary Search: Logarithmic
- `.includes()` : O(n)
- `.indexOf()` : O(n)

- ! Careful of these common traps:
	- A loop does not always mean O(n) complexity
	  ```js
for (let i = 0; i <= 10; i++) { ... }. // This is O(1)
```
	- Nested loops do not always mean O(n^2)
	  ```js
for (let i = 0; i <= n; 1++) {    // a O(n) operation
  for (let j = 0; j <=10; j++){   // a constant operation
```
	- Best runtime for sorting is O(n log n)
		- That is _not_ the same as log n (which is practically constant)

### Takeaways
- Speed only matters if it hits the threshold of “too slow”
- If tradeoff is readability, saves the company employee time, that even if the function runs slower, may be better
	- Example: C is a faster language than javascript, but takes longer to write and is more likely to have bugs. As hardware became faster and cheaper, and programmers salaries increased, employee time/readability became a higher value.
- It’s all about planning to <u>scale</u> and what you need / what the company values for that.

## Space Complexity
- How will memory usage scale as size of inputs increase?
- Almost never worry about this unless at gigantic scale, b/c memory hardware has evolved quickly.

### Data Type Complexities
- Undefined, null, booleans, numbers : O(1) Constant Space
- Strings: O(n) Linear Space 
	- n is the string length
- Arrays/Objects: generally O(n)
	- n is length of array
	- n is number of keys in object

