- Includes excellent, high-performance data structures as part of language.

### Length of Structure

- Generic len(x) returns length of x:
	-   \# chars in string
	-   \# items in list
	-   \# items in dictionary
	-   \# items in a set

## Lists

-   Mutable, ordered sequence
-   O(n) time complexity to search, add, delete
    -   Except when at end of list: O(1) time

(this is same as JS)

### Making Lists

- Can use constructor function, list()
	- This will make list from iterating over arguments:
```python
letters = list("apple")   # ['a', 'p', 'p', 'l', 'e']
```

### Membership

- Can check for membership with `in`:
```python
if "taco" in foods:
    print("Yum!")

if "cheese" not in foods:
    print("Oh no!")
```

### Retrieving By Index

- Can retrieve/mutate item with `[n]`:
```python
print(fav_foods[0])

fav_foods[0] = "taco"
```

```python
fav_foods[-1]   # last item

fav_foods[-3]   # third from end
```

### Slicing

- Sublists: Can retrieve a list from a list:
  `list[start:stop:step]`
	- start: Index to begin retrieval _(default start)_ *inclusive*
	-   stop: Index to end retrieval before _(default: end)_  *exclusive*
	-   step: Number to step _(default: 1)_
		- negative step traverses array *backwards* 

```python
alpha = ['a', 'b', 'c', 'd', 'e']

alpha[2:]        # ['c', 'd', 'e']
alpha[2:4]       # ['c', 'd']
alpha[:3]        # ['a', 'b', 'c']
alpha[::2]       # ['a', 'c', 'e']
alpha[3:0:-1]    # ['d', 'c', 'b']
alpha[::-2]      # ['e', 'c', 'a']
```

- ~ Tip: Slice assignment
	- You can use the slicing syntax to _splice_ from a list (insert or remove things from the list in-place):
```python
>>> letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
>>> letters
['a', 'b', 'c', 'd', 'e', 'f', 'g']
>>> # replace some values
>>> letters[2:5] = ['C', 'D', 'E']
>>> letters
['a', 'b', 'C', 'D', 'E', 'f', 'g']
>>> # now remove them
>>> letters[2:5] = []
>>> letters
['a', 'b', 'f', 'g']
>>> # clear the list by replacing all the elements with an empty list
>>> letters[:] = []
>>> letters
[]

```

### Core API

<table><colgroup><col width="31%"> <col width="69%"></colgroup><tbody><tr><td><code><span>l.append(x)</span></code></td><td>Add <cite>x</cite> to end of of list</td></tr><tr><td><code><span>l.copy()</span></code></td><td>Return shallow copy of list <cite>l</cite></td></tr><tr><td><code><span>l.count(x)</span></code></td><td>Return # times <cite>x</cite> appears in <cite>l</cite></td></tr><tr><td><code><span>l.extend(l2)</span></code></td><td>Add items of <cite>l2</cite> to <cite>l</cite></td></tr><tr><td><code><span>l.index(x)</span></code></td><td>Return (0-based) index of <cite>x</cite> in <cite>l</cite></td></tr><tr><td><code><span>l.insert(i,</span> <span>x)</span></code></td><td>Insert <cite>x</cite> at position <cite>i</cite></td></tr><tr><td><code><span>l.pop(i)</span></code></td><td>Remove &amp; return item at <cite>i</cite> (default last)</td></tr><tr><td><code><span>l.reverse()</span></code></td><td>Reverse list (change in place)</td></tr><tr><td><code><span>l.sort()</span></code></td><td>Sort list in place</td></tr></tbody></table>


### Differences From JS Arrays

- Can’t add new item with `[]`:
```python
alpha = ['a', 'b', 'c']
alpha[3] = 'd'           # error!

```

- Functions that mutate list return None, not data:

JavaScript
```js
let letters = ["c", "a", "b"];
letters.sort(); // in-place; returns it
```

Python
```python
letters = ["c", "a", "b"]
letters.sort() # in-place; returns None
```

## Strings

- Immutable sequence of characters (like JS)

### Making Strings

```python
msg = "Hello!"
also = 'Oh hi!'

long_msg = """This can continue on for several
lines of text"""

greet = f"Hi, {fname} {lname}"

email = f"""Dear {user},
You owe us ${owed}. Please remit."""
```

```python
nums = [1, 2, 3]

str(nums)     # "[1, 2, 3]"
```

### Membership / Substrings

-   Can use `in` for membership (`"e" in "apple"`)
	- This is like JS’ .includes method
-   Can slice to retrieve substring (`"apple"[1:3] == "pp"`)
    -   Cannot splice; strings are immutable!
-   Can iterate over, get letter-by-letter:
```python
for letter in word:
	print(letter)
```

### Core API

<table><colgroup><col width="26%"> <col width="74%"></colgroup><tbody><tr><td><code><span>s.count(t)</span></code></td><td>Returns # times <cite>t</cite> occurs in <cite>s</cite></td></tr><tr><td><code><span>s.endswith(st)</span></code></td><td>Does <cite>s</cite> end with string <cite>t</cite>?</td></tr><tr><td><code><span>s.find(t)</span></code></td><td>Index of first occurrence of <cite>t</cite> in <cite>s</cite> (-1 for failure)</td></tr><tr><td><code><span>s.isdigit()</span></code></td><td>Is <cite>s</cite> entirely made up of digits?</td></tr><tr><td><code><span>s.join(seq)</span></code></td><td>Make new string of <cite>seq</cite> joined by <cite>s</cite> (<code><span>"|".join(nums)</span></code>)</td></tr><tr><td><code><span>s.lower()</span></code></td><td>Return lowercase copy of <cite>s</cite></td></tr><tr><td><code><span>s.replace(t,u,count)</span></code></td><td>Replace <cite>count</cite> (default: all) occurrences of <cite>t</cite> in <cite>s</cite> with <cite>u</cite></td></tr><tr><td><code><span>s.split(sep)</span></code></td><td>Return list of items made from splitting <cite>s</cite> on <cite>sep</cite></td></tr><tr><td><code><span>s.splitlines()</span></code></td><td>Split <cite>s</cite> at newlines</td></tr><tr><td><code><span>s.startswith(t)</span></code></td><td>Does <cite>s</cite> start with <cite>t</cite>?</td></tr><tr><td><code><span>s.strip()</span></code></td><td>Remove whitespace (including newlines) at start/end of <cite>s</cite></td></tr></tbody></table>

## Dictionaries

- Mutable, ordered mapping of keys → values
- O(1) runtime for adding, retrieving, deleting items

(like JS object or Map)

### Making Dictionaries

-   Values can be _any type_
-   Keys can be any **immutable type**
	- Because of this, keys that are strings *must have quotes*
example 1:
```python
fruit_colors = {
    "apple": "red",  # Note quotes around string keys
    "berry": "blue",
    "cherry": "red",
}
```
example 2:
```python
my_dict = {
	"ok": "yes",     
	42: "all good",
	[1,2]: 2         # ERR: not immutable
} 
```

### Membership & Retrieval

-   `in `checks for membership of key (`"apple" in fruit_colors`)
-   `[]` retrieves item by key (`fruit_colors['apple']`)
	- ! Cannot use dot notation (`fruit_colors.apple`= ERROR)
	-   Failure to find using `[]`is an _error_ (can get around this by using `.get(x)`)

### Looping over Dictionaries

```python
ages = {"Whiskey": 6, "Fluffy": 3, "Ezra": 7}

for name in ages.keys():
    print(name)

for age in ages.values():
    print(age)

for name_and_age in ages.items():
    print(name_and_age)
```

- Can unpack name\_and\_age while looping:
```
for (name, age) in ages.items():
    print(name, "is", age)

```
JS calls this same idea _destructuring_.

### Core API

<table><colgroup><col width="28%"> <col width="72%"></colgroup><tbody><tr><td><code><span>d.copy()</span></code></td><td>Return new copy of <cite>d</cite></td></tr><tr><td><code><span>d.get(x,</span> <span>default)</span></code></td><td>Return value of <cite>x</cite> (or optional <cite>default</cite> if missing)</td></tr><tr><td><code><span>d.items()</span></code></td><td>Return iterable of (key, value) pairs</td></tr><tr><td><code><span>d.keys()</span></code></td><td>Return iterable of keys</td></tr><tr><td><code><span>d.values()</span></code></td><td>Return iterable of values</td></tr></tbody></table>

## Sets

- Unordered, unique collection of items, like JS Set
- O(1) runtime for adding, retrieving, deleting

### Making Sets

- Use `{}`, but with only keys, not `key: value`
```python
colors = {"red", "blue", "green"}
```

- Can use constructor function to make set from iterable:
```python
set(pet_list)   # {"Whiskey", "Fluffy", "Ezra"}

set("apple")    # {"a", "p", "l", "e"}
```

- Any **immutable** thing can be put in a set

### Membership

- Use `in` for membership check:
```python
"red" in colors
```

### Core API

<table><colgroup><col width="28%"> <col width="72%"></colgroup><tbody><tr><td><code><span>s.add(x)</span></code></td><td>Add item <cite>x</cite> to <cite>s</cite></td></tr><tr><td><code><span>s.copy()</span></code></td><td>Make new copy of <cite>s</cite></td></tr><tr><td><code><span>s.pop()</span></code></td><td>Remove &amp; return arbitrary item from <cite>s</cite></td></tr><tr><td><code><span>s.remove(x)</span></code></td><td>Remove <cite>x</cite> from <cite>s</cite></td></tr></tbody></table>

 - @ Note on set.pop():
	- Because sets are unordered, this randomly returns arbitrary item
	- This is useful for when you have to do an operation to each item in a set, and want to ensure you only do that operation once per item

### Set Operations

```python 
moods = {"happy", "sad", "grumpy"}

dwarfs = {"happy", "grumpy", "doc"}


moods | dwarfs    # union: {"happy", "sad", "grumpy", "doc"}

moods & dwarfs    # intersection: {"happy", "grumpy"}

moods - dwarfs    # difference: {"sad"}
dwarfs - moods    # difference: {"doc"}

moods ^ dwarfs    # symmetric difference: {"sad", "doc"}

```

(These are so awesome! ![😻|20](https://twemoji.maxcdn.com/v/14.0.2/svg/1f63b.svg))

## Tuples

- Immutable, ordered sequence
	- Like a list, but *immutable*

### Making Tuples

```python
t1 = (1, 2, 3)

t2 = ()           # empty tuple

t3 = (1,)         # one-item tuple: note trailing comma
```

- Can use constructor function to make tuple from iterable:
```python
ids = [1, 12, 44]

t_of_ids = tuple(ids)
```

### What Are Tuples Good For?

- Slightly smaller, faster than lists
- Since they’re immutable, they can be used as dict keys or put into sets
	- Great for  saving`(X, Y)` coordinates

## Comprehensions

- Python has `map()` and `filter()`, like JS
- But _comprehensions_ are even more flexible

### Mapping Into List

Instead of this:
```python
doubled = []

for num in nums:
    doubled.append(num * 2)
```

You can say this:
```python
doubled = [num * 2 for num in nums]
```
- The expression comes first, then the loop

### Filtering Into List

Instead of this:
```python
evens = []

for num in nums:
    if num % 2 == 0:
        evens.append(num)
```

You can say this:
```python
evens = [num for num in nums if num % 2 == 0]
```

### Combining Filtering and Mapping

Instead of taking two steps to find even numbers and then double them:
```python
evens = [num for num in nums if num % 2 == 0]

doubled_evens = [num * 2 for num in evens]
```

Can combine filtering and mapping into one comprehension:
```python
doubled_evens = [num * 2 for num in nums if num % 2 == 0]
```

Can make **lists** via comprehensions from _any kind of iterable_:
```python
vowels = {"a", "e", "i", "o", "u"}
word = "apple"

vowel_list = [ltr for ltr in word if ltr in vowels]
```

Can also make **dictionary comprehensions** and **set comprehensions**:
```python
evens_to_doubled = {n: n * 2 for n in nums if n % 2 == 0}.   # Dictionary Comprehensions

a_words = {w for w in words if w.startswith("a")}            # Set Comprehensions
```

- @ For extra practice: Google “Python List Comprehension practice problems”

