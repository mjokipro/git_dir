
## Positional Arguments

- `*` is used for positional arguments (also called “the splat”)
	-  when arguments are in sequences like list/tuple/range
	- positional arguments means values passed through function call should be in same order mentioned

### Unpacking positional args

- Can “unpack” iterables:
```python
point = [10, 20]

x, y = point
```
Note that no brackets needed on left-hand side

- Or do a **fancy swap**:
```python
a = 2
b = 3

b, a = (a, b)
```

- Can gather rest using `*` before variable:
```python
letters = ["a", "b", "c"]

first_letter, *rest_letters = letters      # Unpacks first_letter, and packs rest_letters with *

print(first_letter)   # "a"
print(rest_letters).   # ["b", "c"]
```

- Can unpack iterables with `*`:
```python
fruits = {"apple", "berry", "cherry"}   # fruits is a set

foods = ["kale", "celery", *fruits]     # unpacked using *
```

### Unpacking with functions

- You can also use unpack/spread capabilities with parameters to functions. This is an intermediate idea, and doesn’t come up very often for many developers.

Positional unpacking:
```python
def draw(x, y, z):
    "Draw point at x/y/z coord"
    ...

coords = [10, 20, 15]

draw(*coords)
```

### Packing positional args

- When you have a function that takes an arbitrary number of arguments during the function call, you can pack all the arguments into a tuple

```python
def add_many(*args):       # Note this packing happens in the function definition stage
	# ...

add_many(2, 3, 7, 9, 33)
```
- This allows the same function to be used for different number of parameters


## Keyword arguments

- `**` is used for keyword arguments
	- when arguments are in the form of a dictionary
	- keyword arguments are in the form `kwargs=value`

### Unpacking keyword args

```python
def greet(prefix, fname, lname):
    "Return greeting for user."

    return f"Hi, {prefix} {fname} {lname}"


user = {"fname": "Jane", "lname": "Goodall"}

greet("Dr", **user)
```

```python
def mul(a, b, c):
	print(a*b*c)

d = {"a":4, "b":5, "c":7}

mul(**d)   # Unpacks dictionary as keyword arguments during fx call
# Output: 140
```

### Packing keyword args

```python
def log(msg, **kwargs):
    "Log msg with flexible keyword args"

    # at this point, kwargs is a dictionary

log("Failure", item="car", model="Ford")  # "Failure" passed to 'msg', any other args must be
#                                           keyword args like shown.
```

