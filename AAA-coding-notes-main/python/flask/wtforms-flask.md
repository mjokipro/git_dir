
- Making forms yourself is tedious:
	-   Write the HTML (including labels, etc)
	-   Write server-side validating code for each field
	-   Add logic for form for showing validation messages
	-   Add protection against security attacks

### WTForm

- WTForm is a Python library providing:
	-   Validation
	-   HTML production
	-   Security

### Flask-WTF

- Flask-WTF is built on top of that, and adds integration with Flask (get data from request, etc)

### Install

```
(venv) $ pip3 install flask-wtf
```

## Basic example

### Defining form class

demo/forms.py
```python
from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
```
- Imports field types to use

demo/forms.py
```python
class AddSnackForm(FlaskForm):
    """Form for adding snacks."""

    name = StringField("Snack Name")  # First arg becomes the label for that field
    price = FloatField("Price in USD")
```
- Subclasses FlaskForm
- First arg of field becomes the label for that field


### Form route handler

demo/app.py
```python
from forms import AddSnackForm
```

demo/app.py
```python
@app.route("/add", methods=["GET", "POST"])
def add_snack():
    """Snack add form; handle adding."""

    form = AddSnackForm()

    if form.validate_on_submit():
        name = form.name.data
        price = form.price.data
        # do stuff with data/insert to db

        flash(f"Added {name} at {price}")
        return redirect("/add")

    else:
        return render_template(
            "snack_add_form.html", form=form)
```
- & Notice the `@app.route()`
	- Listens for GET *and* POST requests
- This validates submitted form _or_ passes instance of form to template.
- Behind the scenes, `.validate_on_submit()` checks to see if this is a GET or POST request, and if a POST request, checks each form field to see if it’s valid.

### Add form template

- & This is *all* the HTML you’ll need to write for your forms 
	- Whether you have 3 fields or 50 fields

demo/templates/snack_add_form.html
```html
<form id="snack-add-form" method="POST">
  {{ form.hidden_tag() }} <!--add type=hidden form fields -->

  {% for field in form
         if field.widget.input_type != 'hidden' %}

    <p>
      {{ field.label }} <!-- Becomes actual HTML for the label -->
      {{ field (class_="form-control") }}  <!-- Becomes actual input element -->

      {% for error in field.errors %}
        {{ error }}  <!-- Becomes html that displays the error near the invalid field -->   
      {% endfor %}
    </p>

  {% endfor %}

  <button type="submit">Submit</button>
</form>
```

## Models vs forms

-   SQLAlchemy provides **model**: class for logical object
	- **model** is everything you need to know about that thing
-   WTForm provides **form class** - **FlaskForm** (from wtforms-flask at least)
- &  A single model may have several different form classes associated with it
    -   Maybe have a “add form” and an “edit form”
    -   Not all fields on add form might appear on edit form
    -   Different validation might apply on add/edit
    -   Different kinds of users (staff vs manager) may be able to edit different fields
- You’ll often take the form data and create/edit an SQLAlchemy object.
- & The name should match between models.py and forms.py classes, but not all fields from the models.py may appear on a form. 

## Field types

- *BooleanField*
	- Normally appears as a checkbox
- *DateField / DateTimeField*
	- Date or Date & Time
- *IntegerField / FloatField*
	- Numeric types
- *StringField / TextAreaField*
	- Single line of text / larger text area

### Selection from choices

- *RadioField*
	- Series of radio buttons from choices
- *SelectField*
	- Drop-down menu from choices
- *SelectMultipleField*
	- Multi-select box from choices

```python
weather = SelectField('Weather',
    choices=[('rain', 'Rain'), ('nice', 'Nice Weather')]
)
```
- <u>SelectField args:</u>
- *First arg = becomes the label*
-  *choices* arg: List of Tuples
	- <u>First item in a tuple: </u> what gets *sent to server* “name” attribute
	- <u>Second item in the tuple:</u> *what the user sees* “value” attribute


- To convert result to integer:
```python
priority = SelectField('Priority Code',
    choices=[(1, 'High'), (2, 'Low')],
    coerce=int
)
```
- *coerce* arg: coerces data type server-side
	- Even though 1 or 2 is sent, it is still sent as a string - *because of HTTP*
	- Coerce option allows auto conversion to integer (or other data type) on the server side - but sent here. 

- & Can set **dynamic choices**:
forms.py
```python
class AddFriendForm(FlaskForm):
    """Form to pick a friend."""

    friend = SelectField("Friend", coerce=int)  # Note: choices not set here 
    #                                            Step 2: this is instantiated
```

app.py
```python
@app.get("/get-friend")
def handle_friend_form():
    """Handle the add-friend form."""

    form = AddFriendForm()     # Step 1: form instance called for AddFriendForm()

    # get current list of users, like:
    #   [(1, "Joel"), (2, "Elie")]
    users = [(u.id, u.name) for u in User.query.all()] # Step 3: users/current info gathered

    form.friend.choices = users  # Instead, dynamically set friend choices after getting users
    #                              Step 4: choices dynamically set to the current info
```

- ~ Note: Tuples and WTForms
	- You may recall that we previously mentioned in the SQLAlchemy Associations lecture that you can return tuples from a query by using the following code:
```
>>> db.session.query(Employee.id, Employee.name).all()
[(1, 'Leonard'), (2, 'Liz'), (3, 'Maggie'), (4, 'Nadine')]
```
- and you may be wondering why we’ve purposely constructed tuples for our AddFriendForm choices above, if SQLAlchemy can just return tuples for us automatically. We simplified things a bit in the Associations lecture—the data structure returned by SQLAlchemy is in fact a *Row*. *Rows* look exactly like tuples, and mostly behave like them, but not always. One of those times is when dealing with WTForms: WTForms inspects the incoming data structure to see if it’s either a list or a tuple, and won’t accept a SQLAlchemy Row. So, we need to explicitly convert our data to be in tuple form before passing it to WTForms.

## Validation

- WTForm provides “validators”:
	- & Should use validators to meet all constraints of the models.py schema
	- % Note that everything on the front end of validation (i.e. required in html form field, etc.) is a ‘nice to have’, but anyone can go in and modify this themselves and still submit the form. Therefore it’s not a substitute for server-side validation.
demo/forms.py
```python
from wtforms.validators import InputRequired, Optional, Email
```

demo/forms.py
```python
class UserForm(FlaskForm):
    """Form for adding/editing friend."""

    name = StringField(    # These names must match the models.py schema
        "Name",
        validators=[InputRequired()])

    email = StringField(
        "Email Address",
        validators=[Optional(), Email()])
```
- *validators* arg 
- See Docs:  [https://wtforms.readthedocs.io/en/2.3.x/validators/#built-in-validators](https://wtforms.readthedocs.io/en/2.3.x/validators/#built-in-validators)

## Update/Edit Forms

- demo/app.py
```python
@app.route("/users/<int:uid>/edit", methods=["GET", "POST"])
def edit_user(uid):
    """Show user edit form and handle edit."""

    user = User.query.get_or_404(uid)
    form = UserForm(obj=user)

    if form.validate_on_submit():
        user.name = form.name.data
        user.email = form.email.data
        db.session.commit()
        flash(f"User {uid} updated!")
        return redirect(f"/users/{uid}/edit")

    else:
        return render_template("user_form.html", form=form)
```
- Passing `obj=data-obj` provides form with defaults from object

## CSRF Security

- **Cross-Site Request Forgery**
	- A form on any site can submit to any other site!

on a webpage at evilhacker.com
```html
<form action="http://yourbank.com/transfer" method="POST">
  <input type="hidden" name="from" value="your-acct">
  <input type="hidden" name="to" value="my-acct">
  <input type="hidden" name="amt" value="$1,000,000">
  <button type=submit">I Love Kittens!</button>
</form>
```

- Therefore, most sites use a “CSRF Token”:
	-   This is generated by the server when a form is shown
	-   It is included in the HTML of the form
	-   It is checked by the server on form submission
- Flask-WTF uses CSRF out-of-the-box:
	-   All forms include a hidden CSRF field
	-   The validate_on_submit method checks for this
- ~ Under the hood, flask can verify the CSRF token because it combines the name of the form and flask’s secret key, and then creates a hash. 
	- This effectively ‘signs’ the csrf token by flask, and is what is checked for validity upon the form.validate_on_submit()

### Hidden CSRF field

- & Make sure you have form.hidden_tag()

demo/templates/snack\_add\_form.html
```html
<form id="snack-add-form" method="POST">
  {{ form.hidden_tag() }} <!--add type=hidden form fields MAKE SURE YOU HAVE THIS -->

  {% for field in form
         if field.widget.input_type != 'hidden' %}

    <p>
      {{ field.label }}
      {{ field }}

      {% for error in field.errors %}
        {{ error }}
      {% endfor %}
    </p>

  {% endfor %}

  <button type="submit">Submit</button>
</form>
```

## Testing

- & For tests to work, need to disable CSRF checking in tests
	- Cause you aren’t going to be posting with this form
	- Just copy/past config to top of file

demo/tests.py
```python
app.config['WTF_CSRF_ENABLED'] = False
```

demo/tests.py
```python
class SnackViewsTestCase(TestCase):
    """Tests for views for Snacks."""

    def test_snack_add_form(self):
        with app.test_client() as client:
            resp = client.get("/add")
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn('<form id="snack-add-form"', html)

    def test_snack_add(self):
        with app.test_client() as client:
            d = {"name": "Test2", "price": 2}
            resp = client.post("/add", data=d, follow_redirects=True)
            html = resp.get_data(as_text=True)

            self.assertEqual(resp.status_code, 200)
            self.assertIn("Added Test2 at 2", html)

```

## Best practices

-   Make distinct add/edit forms, if sensible
-   Add lots of form validation, if appropriate
- &  All non-GET routes return redirect (not render_template) on success
	- Upon failure: render_template


