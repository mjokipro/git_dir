
## Error Handling

- In general, Python raises errors in places JS returns undefined:

-   provide too few/too many arguments to a function
-   index a list beyond length of list
-   retrieve item from dictionary that doesn’t exist
-   use missing attribute on an instance
-   conversion failures (eg, converting “hello” to an int)
-   division by zero
-   _and more!_

In general, in Python: *explicit is better than implicit*

### Catching Errors

```python
# try to convert this to a number

try:
    age = int(data_we_received)
    print("You are", age)

except:
    print("Hey, you, that's not an age!")

# next line is run either way, because error is caught/handled with 'except'
```

- It’s risky, though, to just say except — that catches _all_ errors!
```python
data_we_received = "42"

try:
    age = int(data_we_received)
    print("You are", Age)  # <-- error here!

except:
    print("Hey, you, that's not an age!")
```
This error was for a different reason (age vs Age) - but it was handled with the except block designed for non-number entries.

- Therefore, it is better to catch the specific error you’re looking for:
```python
data_we_received = "42"

try:
    age = int(data_we_received)
    print("You are", Age)   # <-- error here!

except ValueError:
    print("Hey, you, that's not an age!")
```

- This way, other errors still crash program or you can make additional except blocks to handle those cases.
	- Note this is also different from JS: the ‘catch’ block catches ALL errors - then up to you how to handle it

### Common Exception Types

- Note the Capital at the beginning - these are Classes.

<table><colgroup><col width="27%"> <col width="73%"></colgroup><tbody><tr><td><cite>AttributeError</cite></td><td>Couldn’t find attr: <code><span>o.missing</span></code></td></tr><tr><td><cite>KeyError</cite></td><td>Couldn’t find key: <code><span>d["missing"]</span></code></td></tr><tr><td><cite>IndexError</cite></td><td>Couldn’t find index: <code><span>lst[99]</span></code></td></tr><tr><td><cite>NameError</cite></td><td>Couldn’t find variable: <code><span>not_spelled_right</span></code></td></tr><tr><td><cite>OSError</cite></td><td>Operating system error: can’t read/write file, etc</td></tr><tr><td><cite>ValueError</cite></td><td>Incorrect value (tried to convert “hello” to int, etc)</td></tr></tbody></table>

### Raising Errors

- In Python, it’s common for you to “raise” errors to signal problems:  
	- (JavaScript calls this same idea “throwing”)

```python
if color not in {"red", "green", "blue"}:
    raise ValueError("Not a valid color!")
```

### Error Handling Pattern

- Raise exception when you know it should be an error  
  *Throw Errors where they happen*
- Handle it at the point you can give good feedback - structurally, which fx makes the most sense to handle that error?
  *Catch them where you know how to handle them*

- Errors will ‘bubble’ up the chain of who called them, so you can handle errors at an early part of the chain, even if the error wouldn’t occur until later down the function line:
```python
def prompt_user_to_enter_number():
	process_data()
	# Since this function is the function to process data, makes the most sense to 
		# HANDLE ERROR HERE  - with try/except

def process_data():
	something_else()

def something_else():
	get_bounded_avg()

def get_bounded_avg(x):
	# if something is not right with x --> THROW ERROR HERE
```

another example:
```python
def bounded_avg(nums):
    """Return avg of nums (makes sure nums are 1-100)"""

    for n in nums:
        if n < 1 or n > 100:
            raise ValueError("Outside bounds of 1-100")

    return sum(nums) / len(nums)

def handle_data():
    """Process data from database"""

    ages = get_ages(from_my_db)

    try:
        avg = bounded_avg(ages)
        print("Average was", avg)

    except ValueError as exc:       # exc is exception object -- you can examine it directly!
        print("Invalid age in list of ages")

```
