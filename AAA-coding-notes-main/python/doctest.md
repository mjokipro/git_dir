
```python
python3 -m doctest -v file.py
```

## DocTests

- **Doctests** are snippets of interactive demonstration in a docstring
- **“Testable documentation”**
	- Made for primarily positive examples of code to show others how to use it
		- If something is helpful to show, then include it in the docstring. 
		- Think about some edge cases: like if 0 passed in for all num args, etc.
		- Example: If a ‘calculate_tax()’ function has a minimum tax of $10,000, even if all args are 0, would want to show that:
		  `>>> calculate_tax(0, 0, 0)`
		  `10,000`
		- This is less about truly “testing” this, and more about clearly showing the user of your function this example.
	- Also great for ensuring that the documentation stays up to date (in case you change your function later but forgot to change your docstring + doctests)
- doctest module in Python standard library

Example:
```python
def adder(x, y):
    """Adds two numbers together.

        >>> adder(1, 1)
        2

        >>> adder(-1, 1)
        0
    """

    return x + y

```

Example with error:
```python
def bounded_avg(nums):
    """Return avg of nums (makes sure nums are 1-100)

       >>> bounded_avg([1, 2, 3])
       2

       >>> bounded_avg([1, 2, 101])
       Traceback (most recent call last):
           ...
       ValueError: Outside bounds of 1-100
    """

    for n in nums:
        if n < 1 or n > 100:
            raise ValueError("Outside bounds of 1-100")

    return sum(nums) / len(nums)

```

### Running DocTests

```terminal
$ python -m doctest arithmetic.py
  (no output means success!)
```

- Add `-v `for verbose flag:
```terminal
$ python -m doctest -v arithmetic.py
Trying:
    adder(1, 1)
Expecting:
    2
ok
Trying:
    adder(-1, 1)
Expecting:
    0
ok
1 items had no tests:
    arithmetic
1 items passed all tests:
2 tests in arithmetic.adder
2 tests in 2 items.
2 passed and 0 failed.
Test passed.
```

### Test DocTests Failing

- Change your code to test that your doctests *do* fail:
```python
def adder(x, y):
    """Adds two numbers together.

        >>> adder(1, 1)
        2

        >>> adder(-1, 1)
        0
    """

    return x + y + 1  # this is wrong

```
then re-run your tests:
```terminal
  $ python -m doctest arithmetic.py
  *******************************************************************
  File "arithmetic.py", line 10, in arithmetic.adder
  Failed example:
      adder(1, 1)
  Expected:
      2
  Got:
      3
  *******************************************************************
  File "arithmetic.py", line 15, in arithmetic.adder
  Failed example:
      adder(-1, 1)
  Expected:
      0
  Got:
      1
  *******************************************************************
  1 items had failures:
     2 of   2 in arithmetic.adder
  ***Test Failed*** 2 failures.

```

- @ Tip:   **DocTest options**
	- You can also add special comments in your doctests to say “be a little less strict about how the output matches”.
	- For example, sometimes you might have so much output it would be overwhelming to show it all:
```python
>>> range(16)
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

```
- By using the `ELLIPSIS` option, you can elide part of that in your test, like this:
```python
>>> print range(16)  
[0, 1, ..., 14, 15]

```
- Or, if your output may have awkward linebreaks and whitespace that might make it hard to use in a test, you can use `NORMALIZE_WHITESPACE` to ignore all whitespace differences between the expected output and the real output:
```python
>>> poem_line  
'My father moved through
dooms of love'
```


