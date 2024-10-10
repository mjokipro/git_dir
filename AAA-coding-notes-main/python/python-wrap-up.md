## About python, redux

### Python is …

-   **high-level**: you think at a relatively high-level
-   **dynamic**: running script can create its own functions/classes
-   **dynamically-typed**: same variable can be used for int/string/etc
-   **strongly-typed**: “a” + 3 doesn’t eval to “a3”
-   **compiled**

### Python is compiled

- Python gets compiled into “bytecode”
	- This happens when you first run/import Python file. (not a separate compilation)
- Previously-compiled version is stored in `__pycache__/add.pyc`
	- You don’t need those file in Git — they get created when needed

```python
def add(x, y, double=False):
    # do the adding
    result = x + y
    return result * 2 if double else result

add(0, 1)
```

above python function invocation “compiled” into “bytecode”:
```
4           0 LOAD_FAST                0 (x)
            2 LOAD_FAST                1 (y)
            4 BINARY_ADD
            6 STORE_FAST               3 (result)

6           8 LOAD_FAST                2 (double)
           10 POP_JUMP_IF_FALSE       20
           12 LOAD_FAST                3 (result)
           14 LOAD_CONST               1 (2)
           16 BINARY_MULTIPLY
           18 RETURN_VALUE
      >>   20 LOAD_FAST                3 (result)
           22 RETURN_VALUE
```

### Python can have type hints

```python
def add(x: int, y: int) -> int:
    """Add x and y and return results."""

    return x + y
```

-   Editors can use this to help find errors
-   Can produce prettier help/API documentation

## Python can be lazy

this works great…
```python
def find_liked_num(nums):
    """Prompt user until they like a number."""

    for num in nums:
        if input(f"Do you like {num}? ") == 'y':
            return num
```

works great for this…
```python
find_liked_num([1, 3, 4, 8])
```

If we wanted to do that for “all even numbers” …
```python
find_liked_num([2, 4, 6, 8, ...])
```

we need a new function and new logic
```python
def find_liked_even_num():
    """Prompt user until they like an even number."""

    num = 0
    while True:
        if input(f"Do you like {num}? ") == 'y':
            return num
        num += 2
```

-   We can’t use the find\_liked\_nums function we already have
-   We need a new function with special logic
    -   Which is no longer about finding _any_ liked number
    -   It’s about finding a _liked even_ number — had to specify that

### Laziness through yield

we can do this …
```python
def evens(start):
    """Yield even numbers starting at start."""

    while True:
        yield start
        start = start + 2
```

and get a little machine you can think of as a magic list
```python
all_even_nums = evens(start=8) #[8, 10, 12, ...]
```

then we can do this…
```python
find_liked_num(all_even_nums)
```

- **yield** is like “return this value now, and remember where it left off”

### Laziness is good

- It’s nice to be able to loop over data …
	-   even if it’s infinite (like all even numbers)
	-   or it’s just too huge to hold in memory
	-   or it’s expensive to pre-calculate when you might only need some
- A lot of big-data stuff relies on this
- There are even lazy list comprehensions: _generator expressions_

## Operator overloading

- In both JS and Python, some operators (like `+`) mean different things, depending on the types of objects being acted on:

JavaScript
```js
3 + 5    // 8

"hello " + "Whiskey"    // "hello Whiskey"
```

Python
```python
3 + 5    # 8

"hello " + "Whiskey"    # "hello Whiskey"
```

- In Python, you can “overload” an operator in a custom class: that operator can mean something different, and you can control that

### Case-Insensitive strings

demo/cistr.py
```python
class CIString(str):
    """Subclass of string that is case-insensitive.

        >>> CIString("apple") == CIString("Apple")
        True

        >>> CIString("apple") < CIString("Banana")
        True
    """

    def __eq__(self, other):
        """Is self == other?"""
        return self.lower() == other.lower()

    def __lt__(self, other):
        """Is self < other?"""
        return self.lower() < other.lower()

    def __le__(self, other):
        """Is self <= other?"""
        return self.lower() <= other.lower()
```

## Python libraries

### Python standard library

- Lots of useful data structures and features:
	-   queues and stacks
	-   binary search trees
	-   statistics
	-   complex numbers, fractions, cool math stuff
	-   functional programming helpers

### Beautiful Soup

- A lot of sites have APIs that return data.
- Many don’t, and you need to “scrape” HTML to get data.
- Beautiful Soup is a terrific library for this.

### Common data science libraries

- Numpy
	- Super-fast linear algebra and matrix math
- Pandas
	- Data slicing/grouping/querying
- SciKit-Learn
	- Common machine learning algorithms
- & [Good place to start](http://www.scipy-lectures.org/)

## Jupyter

- [Jupyter](http://jupyter.org/) is “interactive computing”
	-   Like IPython in a web page
	-   Can mix in documentation, drawings, code snippets
	-   Often used to play with data or share analyses
	-   Can publish on the web
	-   Can even interactively edit as a group!
- And it’s not just for Python :)

## Zen Of Python

> Beautiful is better than ugly. Readability counts.
> Explicit is better than implicit.
> Simple is better than complex.
> Special cases aren’t special enough to break the rules.
> Errors should never pass silently.
> In the face of ambiguity, refuse the temptation to guess.
> If the implementation is hard to explain, it’s a bad idea.


- @ Tip: Seeing this
	- This was written by Tim Peters, one of the core contributors to the Python project.
	- If you ever need a helpful reminder of this:
	  ```python
	  >>> import this
```

