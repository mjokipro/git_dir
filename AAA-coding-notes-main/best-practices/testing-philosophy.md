
## Why Can’t I Just Test Code Myself?

Yes. You probably do so now.

![_images/typing.gif](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/flask-testing/handout/_images/typing.gif)

### Testing is

-   #1 thing employers ask us about – need to prove your code can do what you say, quickly
-   Something ALL engineers do
-   Automating the boring stuff
-   Fascinating and highly skilled art
-   Peace of mind: develop with confidence!

### Automated Tests Are Particularly Good For

-   Testing things that “should work”
-   Testing that some things don’t work
-   Testing the edge cases (anticipate the unexpected)
-   New things don’t break things that were working (_regression_)

## Kinds of Tests

### Testing a Dryer

-   **Unit Test**: does this individual component work?  Lots of unit tests, less comprehensive
-   **Integration Tests**: do the parts work together? Still quite a bit, but fewer than unit tests
-   **End-to-end Test**: wet clothes → dry clothes?  Only so many ways to test whole app, fewest of them, but the most comprehensive.

![_images/testing-pyramid.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/flask-testing/handout/_images/testing-pyramid.png)

- Some people call and include other notions of testing levels, like “acceptance tests”, “system tests”, and others.

## Unit Tests

-   Test one “unit” of functionality
    -   Typically, one function or method
-   Don’t test integration of components
    -   Don’t test framework itself _(eg, Flask)_
-   Promote modular code
    -   Write code with testing in mind

## Integration Tests

- Test that components work together

## End-to-end Tests

- Test the entire application in a real-world scenario

## Good Testing Practices:

### Breaking Down Code

#### Intermixed Concerns

- How do we test this?
```python
@app.post('/taxes')
def taxes():
    """Calculate taxes from web form."""

    income = request.form.get('income')

    # Calculate the taxes owed
    owed = income / 45.3 * random.randint(100) / other_stuff

    return render_template("taxes.html", owed=owed)
```

#### Breaking Down Code

- Very often, you’ll want to separate web interface from logic
```python
def calculate_taxes(income):
    """Calculate taxes owed for this income."""

    ...
    return taxes # taxes will be some number

@app.post('/taxes')
def taxes():
    """Calculate taxes from web form."""

    income = request.form.get('income')
    owed = calculate_taxes(income)

    return render_template("taxes.html", owed=owed)

```

### How Many Tests??

-   Remember to test failing things, like forms that don’t validate
- ! Be most wary of False Positive Tests
	- Tests that pass when they shouldn’t - this is very bad

### Organizing / Running Tests

#### Small Projects

- For tiny projects, keep tests in one file, tests.py:
```
├── app.py
├── requirements.txt
└── tests.py
```

- Run them like this:
```
(venv) $ python -m unittest
```

#### Larger Projects

- For more complex projects, organize in files named tests\_something.py:
```
├── app.py
├── requirements.txt
├── tests_cats.py
└── tests_dogs.py
```

- Run all of them like this:
```
(venv) $ python -m unittest

```

- % Note: Can also run individual files / cases / test methods:
```
(venv) $ python -m unittest tests_cats

(venv) $ python -m unittest tests_cats.CatViewTestCase

(venv) $ python -m unittest tests_cats.CatViewTestCase.test_meow
```
