## Intro

-   a general purpose programming language
-   fast, powerful, widely used
-   _high level_: express concepts at a high level _(a little more than JS)_
	- in contrast to *low level* language, like **C**, that requires you to specify how much data in bytes you need, and how you want to open this file. Data is also compiled (turned into something that looks very different) in **C**
-   _dynamic_: can change variable types, make new functions in your code, etc
	- dynamic typing: variable type can change while a program is running
	- This is in contrast to *static* languages, where you can’t change your mind about what a variable is
-   runs on servers _(but not in a browser)_
-   particularly used for data science, machine learning, servers, et al
	- data science & machine learning are different names for the same concept

### Python Versions

**Python 2**

-   Latest is 2.7
-   What some people still use
-   What comes by default on OSX

**Python 3**

-   Latest is 3.9 _(you may have 3.8; that’s fine)_
-   Slightly different language & syntax
-   What we’ll use at Rithm

- @ Note: If you’re looking at an old stackoverflow answer to help, they may be using python 2, and there are some different enough things about the language to watch out for

### Installing Python

Test that it works: in a _new Terminal window_
```terminal
$ which python3
/usr/local/bin/python3
```

- Install other Python utility: _ipython_:

Test that it works:
```terminal
$ which ipython
/usr/local/bin/ipython
```

## Interactive Python

- _IPython_ is a program for interactive exploring of Python
	- Better program for playing and exploring with Python than the terminal itself, will show you more info, allow you to check variable values, etc.
```terminal
$ ipython
Python 3.7.0 (v3.7.0:1bf9cc5093, Jun 26 2018, 23:26:24)
Type 'copyright', 'credits' or 'license' for more information
IPython 6.5.0: An enhanced Interactive Python. Type '?' for help.

In [1]: print("Hello, World!")
Hello, World

```
- (CONTROL + D to exit)

## Printing

`print(value, value, ...)`

-   Puts spaces between values
-   Puts return character (_newline_) at the end

```python
x = "awesome"

print("Python is", x)
```

## Indentation

- In _many_ programming languages, you use `{` and `}` to show blocks:

```js
if (voter) {
  console.log("Please go vote!");
  vote();
}
```

- Programmers indent code for readers, but *no* indentation would work the same in JS:
	- ! This would work the same, but ![🤮|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f92e.svg) _So ugly. Please don’t do this_:
```
if (voter) {
console.log("Please go vote!");
vote();
}
```

- & In Python, you don’t use `{`/`}` for blocks; the _indentation is_ what matters:
```python
if voter:
    print("Please go vote!")
    vote()

```

That’s very different than:
```python
if voter:
    print("Please go vote!")
vote()
```

- In JS, people often use 2 or 4 spaces for indentation (styles vary, rithm uses 2)
- & In Python, _everyone_ agrees: it should always be 4 spaces
	- VS code automatically does 4 spaces in a `.py` file

## Variables

-   Python variable name style is `like_this` (lower-snake-case)
-   There is no keyword for declaring variables; ie no let or var
-   No specific way to make un-re-bindable like const
    -   It’s good style to write global constants `LIKE_THIS`
-   “Lexical function scoped”  (same as saying “as written”)
	-  Variables can be redeclared, reassigned, and variables declared in fx are not available outside those fx
	- (This is the same as `var` in Javascript)

Lexical function scoping:
```python
x = 42

def my_function():
	x = 12
	print(x)   # 12

print(x)       # 42
```

### Multi-assignment Variables

- If two variables are being assigned the same value, can happen on the same line *if they are immutable*:
```python
x = y = 6

x += 1

x # Output 7
y # Output 6

```

- Also applies within Classes:
```python
class SerialGenerator:
"""Machine to create unique incrementing (monotonic) serial numbers."""

	def __init__(self, start=0):
	"""Make a new generator, starting at `start`."""
	
		self.start = self.next = start

```

- Note that *if these are mutable*, both will be assigned to the same *reference*, and changing one will change the other:
```python
x = y = [6, 7]

x.pop()

y # Output [6]
```

## Strings

-   Like JS, can use `"` or `'` as delimiters
	- delimit = declare start/end
-   Can be multi-line by using triple-quotes: `"""` or `'''`
	- Can also use `\n` to create new line on a single line string
-   Can interpolate expressions with _f-strings_:
    ```python
    food = "cheese"
    
    print(f"I love {food}")

# Prints:  I love cheese
    ```

-   To debug an interpolation & see expression, put  `'='` at end:
```python
    food = "cheese"
    
    print(f"I love {food=}")

# Prints:  I love food='cheese'
```


## Numbers

-   Int, float, or complex number types (complex numbers have an imaginary component and concrete number)
	-   In JS, there are only floating-point numbers
-   `+`, `-`, `*`, `/` (true division), `//` (integer division) `%` (modulo: remainder after division)
-   Dividing by zero is an error (JS: is Infinity, except 0/0, which is NaN)
-   Can use + and \* on strings: `"cat" + "food"` or `"yay" * 3`

## Lists

-   ordered
-   can be heterogeneous: `[1, "apple", 13.5]`
	- heterogeneous = multiple types of data
- (both of these are similar to JS arrays)

## Equality

**JavaScript**
-   \== loose equality
    -   `7 == "7"`
-   \=== strict equality
    -   `7 === "7"  // false`
-   Objects & arrays only equal  
    when same identity

**Python**
-   \== equality (strict about types)
    -   `7 == "7"  # False`
-   Structures with same items _are_ equal
    -   `[1, 2, 3] == [1, 2, 3]`
-   Use `is` to check obj identity
    -   `[1, 2] is [1, 2]  # False`

## Truthiness

- &  In JS, these things are falsy:
    -   `0`, `0.0`, `""`, undefined, null, NaN, false
-  In JS, these things are (perhaps unexpectedly) truthy:  
    -   `[]`, `{}`  ![⚠️|15](https://twemoji.maxcdn.com/v/14.0.2/svg/26a0.svg)
- &  In Python, these things are falsy:
    -   `0`, `0.0`, `""`, None, False
    - `[]` (empty list), `{}` (empty dictionary), `set()` (empty set).  ![⚠️|15](https://twemoji.maxcdn.com/v/14.0.2/svg/26a0.svg) 
-   In Python, these things are truthy:
    -   Any non-empty string, non-empty list/dict/set, non-0 number
    -   True

### And/Or/Not

-   JS: `&&`, `||`, `!`
-   Python: `and`, `or`, `not`
-   Just like in JS, these “short circuit”
	- “short-circuit” means these follow the same rules for the `determining subpart` as [JS’ boolean logic](boolean-logic)

short circuiting:
```python
x = 42 or "hello"
# 42 wins

y = 0 or "hi"
# "hi" wins
```

### If

```python
if grade == "A":
    print("awesome job!")

elif grade == "F":
    print("ut oh")

else:
    print("don't worry too much")

```

(parens around condition aren’t required, unlike JS)
```python
if age >= 18:
    if unregistered:
        print("please register")

    else:
        print("keep voting!")

else:
    print ("Wait a bit")

```

### Ternary

JavaScript
```js
let msg = (age >= 18) ? "go vote!" : "go play!"
```

Python
```python
msg = "go vote!" if (age >= 18) else "go play!"
```

- The successful condition is stated first in python, while the conditional is first in JS
- In both, parens are optional but often helpful

## Loops

### While Loops

```python
count = 10

while count > 0:
    print(count)
    count = count - 1   # or "count -= 1", but not "count--"

print("Liftoff!")

```

### For Loops

- Python for loops are similar to JS for … of loops:
```python
for snack in ["Peanut", "Twizzler", "Mars Bar"]:
    print("I ate a", snack)
```

To loop 5 times:
```python
for num in [1, 2, 3, 4, 5]:
    print(num)
```

- Can also use range() function:
```python
for num in range(5):   # makes [0, 1, 2, 3, 4]
    print(num)
```
- range:
	- start is inclusive, default 0 (& therefore optional)
	- end is exclusive, required
	- step, default 1 (optional)


- enumerate:
```python
for count, value in enumerate(values):
...     print(count, value)
...
0 a
1 b
2 c
```
## Functions

```python
def add_numbers(a, b):
    sum = a + b
    print("doing math!")
    return sum

```

- Functions that don’t explicitly *return* return *None*

- Can pass arguments by name:
```python
def order_pizza(size, flavor):
    print(f"{size} pizza with {flavor} topping")

order_pizza("large", "mushroom")

order_pizza(size="small", flavor="sausage")

# Same thing
order_pizza(flavor="sausage", size="small")

```

- Can provide defaults for parameters:
```python
def send_invite(name, city="SF", state="California"):
    print(f"mailing invitation to {city}, {state}")

send_invite("Jenny", "Portland", "Oregon")

send_invite("Joel")

```

- When invoking a Python function, providing too many/too few arguments is an error  
	- (in JS, this is ignored / becomes undefined):
```python
def add_three_numbers(a, b, c):
    return a + b + c

add_three_numbers(10, 20, 30)       # 60, yay!

add_three_numbers(10, 20)           # error!

add_three_numbers(10, 20, 30, 40)   # error!

```

## Comments and Docstrings

### Comments

-  `#` rest of line is comment (use to explain complex code)

### Docstrings

- **Docstrings** are the strings at top of function or file that document it
    -   Documents what the function/file does
    -   Shown when you ask for `help(some_function)`
```python
def bounded_avg(nums):
    """Return avg of nums (makes sure nums are 1-100)"""

    for n in nums:
        if n < 1 or n > 100:
            raise ValueError("Outside bounds of 1-100")

    return sum(nums) / len(nums)

```

- It’s incredibly good style for every function to have one!

- ~ Tip:  Use triple-quotes
	- Docstrings are just strings, so if they don’t have newlines in them (are one line long), you could use `"` instead of `“””` around them. However, it’s very common practice to always use triple-quotes here:
		-   it helps the reader at a glance start to recognize docstrings
		-   a docstring that starts as a single line long will often become multiline as more documentation is added to it

## Modes

### Running a Source File

```terminal
$ python3 mygame.py
You win! Your score is 10

$ # back in shell
```

-   runs Python
-   loads `mygame.py`
-   executes the code
-   returns to the terminal when done.

### Running in IPython

```terminal
$ ipython
In [1]: %run mygame.py
```

-   runs `mygame.py`
-   stays in IPython, variables are still set
	- can test variable values, etc.

### Play in the Console

It’s. The. Best. Way. to. Learn.

Good idea: open a console at the same time as your editor!

## Getting Help

### dir()

_“Show me the methods and attributes of this object”_

```python
>>> dir([])
>>> ['__add__', 'append', 'count', 'extend', 'index', 'insert',
'pop', 'remove', 'reverse', 'sort']

```

- % Note
	- \_\_methods\_\_
	- You’ll notice many objects provide a lot of methods that have names starting and ending with double-underscores (Python programmers often call these “special methods” or “dunder _\[for ‘double-underscore’\]_ methods”.
	- These aren’t methods you call directly (ie, you wouldn’t ever say `mylist.__add__()`) — instead, these work behind-the-scenes to support other operations of the object.
	- Generally, you can ignore them when examining an object.

### help()

_“Show me help about how to use this object”_

```python
>>> help([])
```
- q to quit that