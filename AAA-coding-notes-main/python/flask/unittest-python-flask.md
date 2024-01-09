## Quick reference

```shell

FLASK_DEBUG=False python -m unittest <name-of-python-file>

```

## Python unittest module

-  **unittest** is a general testing framework for *both* Unit and Integration tests
	- It just has an overly specific name
- Compared to doctests, very helpful for when you have a lot of tests, or interesting hierarchies of tests
-  **unittest** uses classes
	- Note Parent class below - TestCase
-  **unittest** is in the Python standard library, but you need to import it into your test_file
-  Create a separate testing file -  `tests_filenameTested.py`
	- Note example below

demo/tests\_arithmetic.py
```python
import arithmetic                 # Import the file you are testing
from unittest import TestCase     # Import TestCase Class from unittest


class AdditionTestCase(TestCase):
    """Examples of unit tests."""

    def test_adder(self):
        assert arithmetic.adder(2, 3) == 5

```

-   Test cases are a bundle of tests
    -   In a class that subclasses `TestCase`
    - & Test methods *must* start with `test_`
-   `python -m unittest NAME_OF_FILE` runs all cases

## TestCase assertions

- Can use `assert `directly, or `self.assertMethod()` 

### assert
-   `assert `raises `AssertionError` if expression is False
-   Can provide optional exception message
-   Code exits as soon as an exception is raised

demo/tests\_arithmetic.py[
```python nums {5}
class AdditionTestCase(TestCase):
    """Examples of unit tests."""

    def test_adder(self):
        assert arithmetic.adder(2, 3) == 5
```

### self.assert
- $ Recommended Method: It provides better output, including the expected value
```python nums {5}
class AdditionTestCase(TestCase):
    """Examples of unit tests."""

    def test_adder_2(self):
        self.assertEqual(arithmetic.adder(2, 2), 4)
```


#### self assert methods 
| Method | Checks that |
| --- | --- |
| assertEqual(a, b) | a == b |
| assertNotEqual(a, b) | a != b |
| assertTrue(x) | bool(x) is True |
| assertFalse(x) | bool(x) is False |
| assertIs(a, b) | a is b |
| assertIsNot(a, b) | a is not b |
| assertIsNone(x) | x is None |
| assertIsNotNone(x) | x is not None |
| assertIn(a, b) | a in b |
| assertNotIn(a, b) | a not in b |
| assertIsInstance(a, b) | isinstance(a, b) |
| assertNotIsInstance(a, b)   | not isinstance(a, b) |

## Unit Tests

-   Test one “unit” of functionality
    -   Typically, one function or method
-   Don’t test integration of components
    -   Don’t test framework itself _(eg, Flask)_
-   Promote modular code
    -   Write code with testing in mind

example:
```python nums
class AdditionTestCase(TestCase):
    """Examples of unit test"""

    def test_adder_2(self):
        self.assertEqual(arithmetic.adder(2, 2), 4)
```

## Integration Tests

- Test that components work together

### Integration Testing Flask App

##### What kinds of things do we want to test in our Flask applications?
-   “Does this URL path map to a route function?”
-   “Does this route return the right HTML?”
-   “Does this route return the correct status code?”
-   “After a POST to this route, are we redirected?”
-   “After this route, does the session contain expected info?”

### Writing Integration Tests

- Also written with the **unittest** framework.

### **test\_client**

demo/tests\_flask.py
```python
from unittest import TestCase
from app import app

```

demo/tests\_flask.py
```python nums {5}
class ColorViewsTestCase(TestCase):
    """Examples of integration tests: testing Flask app."""

    def test_color_form(self):
        with app.test_client() as client:
            # can now make requests to flask via `client`
```

- To use a **test_client**, include syntax from line 5 above.
	- Technically, this comes from “Werkzeug”, a library that Flask uses.
	- This doesn’t start a real web server
		- Which means we don’t have to worry about starting flask when running these tests
		-  And we can still make requests to Flask via client.

#### Flask API Response

- The response  received after using the **test_client** to make a requests has its own methods that allow easier access and manipulation of the data it stores
	- Common methods:
		- For checking HTML returned
			- `response.get_data(as_text=True)`
			- Converts HTTP to something you can look into
			- #rithmQ what type of data is returned from .get_data? normally?
		- For checking JSON data returned
			- `response.get_json()`  This method returns the *parsed* JSON, so you can treat it like a python object


### GET Request

demo/tests\_flask.py
```python nums {4-5, 7-8}
def test_color_form(self):
    with app.test_client() as client:
        # can now make requests to flask via `client`
        resp = client.get('/')
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('<h1>Color Form</h1>', html)
```

### POST and Form Data

demo/tests\_flask.py
```python nums {3-4}
def test_color_submit(self):
    with app.test_client() as client:
        resp = client.post('/fav-color',
                           data={'color': 'blue'})
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('Wow! I like blue, too', html)
```

### Testing Redirects

demo/tests\_flask.py
```python nums {5-6}
def test_redirection(self):
    with app.test_client() as client:
        resp = client.get("/redirect-me")

        self.assertEqual(resp.status_code, 302)
        self.assertEqual(resp.location, "http://localhost/")
```

- `follow_redirects=True` makes new request when response redirects:
demo/tests\_flask.py
```python nums {3, 6}
def test_redirection_followed(self):
    with app.test_client() as client:
        resp = client.get("/redirect-me", follow_redirects=True)
        html = resp.get_data(as_text=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn('<h1>Color Form</h1>', html)

```

### Testing the Session

- To test **value of session**:
demo/tests\_flask.py
```python
from flask import session
```
demo/tests\_flask.py
```python nums {6}
def test_session_info(self):
    with app.test_client() as client:
        resp = client.get("/")

        self.assertEqual(resp.status_code, 200)
        self.assertEqual(session['count'], 1)
```

- To **set the session** before the request, add block like this:
demo/tests\_flask.py
```python nums {4-5}
    def test_session_info_set(self):
        with app.test_client() as client:
            # Any changes to session should go in here:
            with client.session_transaction() as change_session:
                change_session['count'] = 999

            # Now those changes will be in Flask's `session`
            resp = client.get("/")

            self.assertEqual(resp.status_code, 200)
            self.assertEqual(session['count'], 1000)
```

### setUp and tearDown

- `setUp` and `tearDown` methods are called before/after _each test_.
```python
class FlaskTests(TestCase):

  def setUp(self):
      """Stuff to do before every test."""

  def tearDown(self):
      """Stuff to do after each test."""

  def test_1(self):
      ...

  def test_2(self):
      ...
```
- Runs, in order:  
	- setUp, test\_1, tearDown  
	- setUp, test\_2, tearDown
- Often useful to add/remove data in test database before/after each test
- #rithmQ Within each test_function(), setUp and tearDown are called? example?

### Making Testing Easier

- Add these before test case classes:
demo/tests\_flask.py
```python
# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

```

- @ Tip:  **Seeing Errors In Tests**
- If a route raises an error, it can be hard to debug this in a test.
- For example, in your server.py:
```python
@app.get('/')
def homepage():
    raise KeyError("Foo")
```
- In your tests\_flask.py:
```python
class MyTest(unittest.TestCase):
    def test_home(self):
        with app.test_client() as client:

            result = client.get('/')
            self.assertEqual(result.status_code, 200)
```
- When you run your tests, it will fail, as that route returns a 500 (Internal Server Error), not a 200 (Ok). However, you won’t see the error message of the server within your test.
- To fix this, you can set the Flask app’s configuration to be a in TESTING mode, and it will print all Flask errors to the console:
	- & This what `app.config['TESTING'] = True` does.

## Resources

-   Doctests: [https://docs.python.org/3/library/doctest.html](https://docs.python.org/3/library/doctest.html)
-   Unittest: [https://docs.python.org/3/library/unittest.html](https://docs.python.org/3/library/unittest.html)
-   Flask Testing [https://flask.palletsprojects.com/en/2.0.x/testing/](https://flask.palletsprojects.com/en/2.0.x/testing/)
-   Test Client [https://werkzeug.palletsprojects.com/en/2.0.x/test/](https://werkzeug.palletsprojects.com/en/2.0.x/test/)
