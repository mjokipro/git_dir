## Flask features

- A scalable, powerful, general-purpose web application framework.

### What we covered

-   Routes
-   Jinja templates
-   Flask-SQLAlchemy
-   Flask Testing
-   Cookies & Sessions
-   JSON and flask
-   Flask-WTForms

We left a lot out — intentionally

## What we didn’t cover

### url_for

you did this once…
```python
@app.get("/users/<int:id>")
def user_profile(id): ...
```

you did this a dozen places…
```python
<a href="/users/{{ user.id }}">See user</a>
```

and this in lots of places
```python
def some_other_view():
    ...
    return redirect(f"/users/{user.id}")
```

- What if you wanted to change that URL?
	-   Perhaps to /profiles/\[user-id\]?
	-   Perhaps to /warbler/users/\[user-ud\]?

you still do this once…
```python
@app.get("/users/<int:id>")
def user_profile(id): ...
```

but now you don’t need to hardcode URL
```python
<a href="{{ url_for('user_profile', id=user.id) }}">go</a>
```

and this in lots of places
```python
from flask import url_for

def some_other_view():
    ...
    redirect_url = url_for('user_profile', id=user.id)
    return redirect(redirect_url)
```

### Blueprints

- Build “applications” in Flask:
	-   Each app can have own models, forms, tests, views
	-   Can re-use an app in many sites
	    -   Many sites could use “blogly” app
	-   Useful for larger/more complex sites

### Signals

- “When \[this thing\] happens, do \[this other\] thing.”
	- (eg send an email when a user registers, no matter how they register)

### Lots of Jinja stuff

- Lots of additional features in Jinja:
	-   sharing parts of templates/repeated code
	-   formatting of numbers, dates, lists in the template
	-   caching parts of templates (“this part only changes every 5 minutes”)
	-   and more!

## Popular add-ons

### WTForms & SQLA

you did this a lot
```python nums {6-11}
def edit_pet(pet_id):
    pet = Pet.query.get(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.color = form.color.data
        pet.age = form.age.data
        pet.weight = form.weight.data
        pet.num_legs = form.num_legs.data
        ...
```

you can do this
```python nums {6}
def edit_pet(pet_id):
    pet = Pet.query.get(pet_id)
    form = EditPetForm(obj=pet)

    if form.validate_on_submit():
        form.populate_obj(pet)
```

### WTForms-Alchemy

- Can generate WTForms from SQLAlchemy model:

forms.py
```python nums {12-14, 16-18}
from flask_wtf import FlaskForm
from wtforms_alchemy import model_form_factory
from models import db, Pet, Owner

BaseModelForm = model_form_factory(FlaskForm)

class ModelForm(BaseModelForm):
    @classmethod
    def get_session(self):
        return db.session

class PetForm(ModelForm):
    class Meta:
        model = Pet

class OwnerForm(ModelForm):
    class Meta:
        model = Owner
```

### Flask-Login

- Product that provides common parts of user/passwords/login/logout
- Similar to what you built, but out-of-box.

### Flask-Mail

- Can send email from Flask!

### Flask-Admin

- Can get decent CRUD admin views from SQLAlchemy models:

![_images/flask-admin.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/flask-wrapup/handout/_images/flask-admin.png)

### Flask-Restless

- Get CRUD API endpoints from SQLAlchemy models:

```python nums {17, 20-21}
from flask.restless import APIManager

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    birth_date = db.Column(db.Date)

class Computer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    vendor = db.Column(db.Unicode)
    purchase_time = db.Column(db.DateTime)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    owner = db.relationship('Person')

# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# API endpoints, available at /api/<tablename>
manager.create_api(User, methods=['GET', 'POST', 'DELETE'])
manager.create_api(Computer, methods=['GET'])
```

### Scalability of flask

- Flask can handle millions of users and scale in that way
- But, if you have thousands of routes, many <u>developers</u>, would lean toward using a more conventional/opinionated framework (like django).

## Will you use flask?

- Maybe.
- It’s popular and used by many real companies, large and small.
- It’s also a great choice for personal projects, code challenges, etc.

## Flask versus …

### Flask v Node-Express

- Pretty similar, actually.
- Both work at same “level of concepts”, and share lots of ideas.
- You can even use Jinja to make templates with Express!

### Flask v Django

- Django is a popular, larger, more featureful Python Framework.
- It’s a _higher level_ and _more opinionated_

Flask model.py
```python
class Pet(db.Model):
    id = ...
    name = ...
    color = ...
    owner_id = ...

    owner = db.relationship("Owner", backref="pets")
```

*VS.*

Django model.py
```python
class Pet(models.Model):
    name = ...
    color = ...
    owner = models.ForeignKey("Owner")

    # assumes "id" of auto-incrementing int
    # defines relationship & make "owner_id" column
```

Flask app.py
```python
@app.route("/pets/<int:id>/edit", methods=["GET", "POST"])
def edit_pet(id):
    """Show pet edit form / handle edit."""

    pet = Pet.query.get(id)
    form = PetEditForm(obj)    # need to make form!

    if form.validation_on_submit():
        pet.name = form.name.data
        pet.color = form.color.data
        db.session.commit()
        redirect(f"/pets/{id}")

    return render_template("pet_edit.html", form=form)
```

*VS.*

Django views.py
```python
class PetEditView(generic.UpdateView):
    """Show pet edit form / handle edit."""

    model = Pet
```

- So, is Django “better”?
	- Nope.
	- If you like Django’s patterns & they fit your use cases, you can build an app faster by following those patterns.
	- Django may be better suited if projects involve a lot of developers- because it’s so opinionated, it keeps consistency across developers better.
- But:
	-   they take a longer amount of time to learn
	-   if things break, it can be harder to understand
	-   if you want to change how things work, it can be harder
- Flask is like a really nice bicycle:
	- It’s great for easy trips, can scale up to long journeys, isn’t too opinionated about where you use it, and it’s relatively easy to understand and fix.