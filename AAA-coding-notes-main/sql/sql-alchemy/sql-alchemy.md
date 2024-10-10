## Goals

- Learn to use object-oriented techniques with relational DBs.
- Without writing any SQL.

```python
>>> whiskey = Pet(name='Whiskey', species="dog", hunger=50)

>>> whiskey.hunger
50

>>> whiskey.hunger = 20
```

## SQLAlchemy intro

-   Popular, powerful, Python-based ORM (object-relational mapping)
-   Translation service between OOP in our server language and relational data in our database
	- ORM is like the glue between *storing data using OO* and *storing data using database*
	- *The biggest advantage of ORM’s is the abstraction they offer: mapping OO thinking with database functionality.* 
		- This means the flask programmer doesn’t have to think about PK or Foreign key and referencing, etc. It abstracts this all away 
-   Can use by itself, with Flask, or other web frameworks
-   Can talk to SQLite, PostgreSQL, MySQL, and more
-   You (almost) never have to change code if you change databases

### Installing SQLAlchemy

- Need the program that lets Python speak PostgreSQL: `psycopg2`
- Need the program that provides SQLAlchemy: `flask-sqlalchemy`

```shell
(venv) $ pip3 install psycopg2-binary
(venv) $ pip3 install flask-sqlalchemy
```

### Sample model

- We write the code on the left in our models.py file
- We *don’t* write any code on the right – it gets written for us by sql alchemy
![[sql-alchemy-1678889986307.jpeg]]

## Setup

- Copy paste this exactly for each project:
	- don’t need to memorize, just keep this on hand #rithmRefactor 
demo/models.py
```python nums
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    app.app_context().push()
    db.app = app
    db.init_app(app)


class Pet(db.Model):
    """Pet."""
# ...
```

demo/app.py
```python nums {1, 6, 9-12, 14}
import os

from flask import Flask, request, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension

from models import db, connect_db, Pet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///db_name')  # ...///db_name will change
    # The config above connects the instance of SQLAlchemy (db) to the database on your computer. You do need to create this database on your computer the first time you set this up.
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
```

-   SQLALCHEMY\_DATABASE\_URI: Where is your database?
	- The 2nd argument to the `os.environ.get("DATABASE_URL", 'postgresql:///db_name')` will change based on each project/database you are working out of. 
	- & Change the ending of that arg `...///CHANGE_THIS` to be the database name
	- Notice that this is using a .get request, and thus we are setting this path up to be the default path when “DATABASE_URL” is not found. 
-   SQLALCHEMY\_TRACK\_MODIFICATIONS: Always set to `False`
-   SQLALCHEMY\_ECHO: Always set to `True`. This prints SQL to terminal _(helpful for debugging)_

- An environmental variable is a variable in the shell.  
	- These are often used to configure programs.

Setting/viewing in the shell
```
$ export MY_VAR="hello"   # setting an env var
$ echo $MY_VAR            # showing an env var
```

Setting/viewing in Python
```python
import os
os.environ["MY_VAR"] = "hello"
print(os.environ["MY_VAR"])
```

demo/app.py
```python
# get env var `DATABASE_URL`, using default if not found

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    "DATABASE_URL", 'postgresql:///sqla_intro')
```

## Models

- &  Models must *always* subclass db.Model
- &  Name SQL table with `__tablename__`

- ~ Note:
	- Class - *capitalized* - and -  *singular*
	- Database - *lowercase* - and - *plural*

demo/models.py
```python nums {1, 4}
class Pet(db.Model):
    """Pet."""

    __tablename__ = "pets"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)

    name = db.Column(
        db.String(50),
        nullable=False,
        unique=True)

    species = db.Column(
        db.String(30),
        nullable=True)

    hunger = db.Column(
        db.Integer,
        nullable=False,
        default=20)


```

-   Specify the type of column
	- .String() or .Text is like TEXT in SQL.  .String(5) is like VARCHAR(5)
-   Columns can be NULL  
	- unless `nullable=False`
-   Common options:
    - default
    - unique
    - primary_key
    - autoincrement  (like SERIAL in SQL)

demo/models.py
```python nums {6-9, 11-14, 16-18, 20-23}
class Pet(db.Model):
    """Pet."""

    __tablename__ = "pets"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)

    name = db.Column(
        db.String(50),
        nullable=False,
        unique=True)

    species = db.Column(
        db.String(30),
        nullable=True)

    hunger = db.Column(
        db.Integer,
        nullable=False,
        default=20)
```

### Creating the database

-   First, create database with `createdb sqla_intro`
-   Create table for each model in IPython:
```python 
In [1]: %run app.py
In [2]: db.create_all()
```
- & Only have to do once (not per table) 
	- creates any missing tables
	- no effect if tables already exist
- & If you make a change the table *schema*:
	- . drop_all()  *# Drop all the tables*
	- Then re-run .create_all()  *# Create all the tables (again)*
	- % Note: you only need to do this if you made a change to the table *schema*, because this defines how the table is set up. Do not need to drop for other changes to methods, etc.

- ~ Note: *Do I always have to drop the table?*
	- Dropping all of your tables may seem like an extreme move every time you make a change to your schema. There are tools that can help you update your schema more smoothly. _Database migrations_ are a common way to do this, but this topic is beyond our scope.

## Using models

```python 
>>> fluffy = Pet(name='Fluffy', species="cat", hunger=30)
>>> fluffy.hunger   # Note: right now, fluffy is just a python instance, not in database
30

>>> db.session.add(fluffy)    # Now, added to database, but pending
>>> db.session.commit()  # Commit the transaction, fluffy officially in database, SQL Alchemy will output to terminal at this stage
```
- You only have to use `db.session.add()` to add a new object once – you don’t need to keep adding it to the session each time you change it.
- & SQL Alchemy will output to terminal anytime things are updated in the database
	- Keep an eye out for this and use it to troubleshoot

### Where to add & commit

- You can `db.session.add()` within the *route* where a new instance is created, or within a *class method* 
	- *class method* may make a bit more sense when class methods are used to create new instances, because this is where this created, but Joel has only like 51% preference for this.
- & *Always* want `db.session.commit()` at the *bottom of the route*.
	- `db.session.commit()` finishes the transaction, want to make sure everything that should be completed, completes within the route before committing it.  That way, if something goes wrong, its like none of it ever happened when session is rolled back. (Transaction begins at the start of the route)

route
```python nums {19}
@app.route('/register', methods=['GET', 'POST'])
def register():
	"""Register a user: produce form and handle form submission."""
	
	if AUTH_KEY in session:
		return redirect(f"/users/{session[AUTH_KEY]}")
	
	form = RegisterForm()
	
	if form.validate_on_submit():
		username = form.username.data
		password = form.password.data
		first_name = form.first_name.data
		last_name = form.last_name.data
		email = form.email.data
		  
		user = User.register(username, password, first_name, last_name, email)

		db.session.add(user)
		db.session.commit()
		session[AUTH_KEY] = user.username
		
		return redirect(f"/users/{user.username}")
	
	else:
		return render_template("users/register.html", form=form)
```

class method in models.py
```python nums {20}
class User(db.Model):
	"""User."""

	# ...

	@classmethod
	def register(cls, username, password, first_name, last_name, email):
		"""Register a user, hashing their password."""
		  
		hashed = bcrypt.generate_password_hash(password)
		hashed_utf8 = hashed.decode("utf8")
		user = cls(
			username=username,
			password=hashed_utf8,
			first_name=first_name,
			last_name=last_name,
			email=email,
		)

		db.session.add(user)
		
		return user
```

## Querying

![[sql-alchemy-1678891182661.jpeg]]

- Note : `.filter()` can handle everything and more complex things than `.filter_by()` can do.
	- `.filter_by()` is exact matches only

### Fetching records

- `.get(pk)`
	- Get single record with that primary key value
- `.all()`
	- Get all records as a list
- `.first()`
	- Get first record or None
- `.one()`
	- Get first record, error if 0 or if > 1
- `.one_or_none()`
	- Get first record, error if >1, None if 0
	- example: should not have duplicate emails  — throw error if more than 1, but if not there that’s okay, return none, or if its there, return that record.
- `.count()`
	- Get number of records found without fetching all

- The *actual action* happens with one of the following methods. 
	- Without a fetching function, it just saves this query into a variable 
![[sql-alchemy-1678935252390.jpeg]]
- Adding the fetching function tells SQL Alchemy to actually go right now and get these records:
![[sql-alchemy-1678935387159.jpeg]]

## Methods

demo/models.py
```python nums {11-12, 14-16, 18-19, 21-22}
class Pet(db.Model):
    """Pet."""

    __tablename__ = "pets"

    id = ...
    name = ...
    species = ...
    hunger = ...

    def greet(self):
        """Greet using name."""

        name = self.name
        species = self.species or "thing"
        return f"I'm {name} the {species}"

    def feed(self, units=10):
        """Nom nom nom."""

        self.hunger -= units
        self.hunger = max(self.hunger, 0)
```

Working with model
```python
>>> fluffy.greet()
'I am Fluffy the cat'

>>> fluffy.feed()
>>> fluffy.hunger
>>> db.session.commit()  # save
```

### Class methods

- ~ Reminder: Class Methods
    -   Most methods are “instance methods”
        -   These are called on an instance of a class (ie, a single cat)
        -   They can refer to/change attributes of that instance
    -   Some methods are “class methods”
        -   They are called on the **class itself**
        -   They can’t refer to instance attributes
        -   Often used as “factories” to return instances

demo/models.py
```python nums {14-16, 18-19}
class Pet(db.Model):
    """Pet."""

    __tablename__ = "pets"

    id = ...
    name = ...
    species = ...
    hunger = ...

    def greet(self): ...
    def feed(self, units=10): ...

    @classmethod   # defined using decorator
    def get_by_species(cls, species):  # cls is like 'self' & should be 1st param
        """Get all pets by species."""

        return Pet.query.filter_by(  
            species=species).all()   # This example is a class method b/c it is querying for info that is not specific to the species. Don't need to create an instance to do this, and shouldn't have to.
```

Working with model
```python
>>> Pet.get_by_species("dog")
[<Pet ...>, <Pet ...>]
```

## SQLAlchemy with Flask

### Flask-SQLAlchemy

-   Add-on product to integrate Flask and SQLAlchemy
	- (There’s a regular SQL Alchemy)
-   Benefits
    -   Ties SQLAlchemy session to Flask response
        - Flask-SQLAlchemy is what makes anything within a HTTP request happen within a transaction.
    -   Simplifies finding things in SQLAlchemy API
-   With Flask-SQLAlchemy, all useful methods are on *db*.
    -   With vanilla SQLAlchemy, stuff is spread all over
    -   There are useful web-related methods, like:
        - `Pet.objects.get_or_404(pk)`


## Demo

demo/app.py
```python
@app.get("/")
def list_pets():
    """List pets and show add form."""

    pets = Pet.query.all()
    return render_template("list.html", pets=pets)
```

demo/templates/list.html
```html
<ul>
  {% for pet in pets %}
    <li><a href="/{{ pet.id }}">{{ pet.name }}</a></li>
  {% endfor %}
</ul>
```

demo/templates/list.html
```html
<form method="POST">
  <p>Name:     <input name="name"></p>
  <p>Species:  <input name="species"></p>
  <p>Hunger:   <input name="hunger"></p>
  <button>Save</button>
</form>
```

demo/app.py
```python
@app.post("/")
def add_pet():
    """Add pet and redirect to list."""

    name = request.form['name']
    species = request.form['species']
    hunger = request.form['hunger']
    hunger = int(hunger) if hunger else None

    pet = Pet(name=name, species=species, hunger=hunger)
    db.session.add(pet)
    db.session.commit()

    return redirect(f"/{pet.id}")
```

demo/app.py
```python
@app.get("/<int:pet_id>")
def show_pet(pet_id):
    """Show info on a single pet."""

    pet = Pet.query.get_or_404(pet_id)
    return render_template("detail.html", pet=pet)
```

demo/templates/detail.html
```html
<h1>{{ pet.name }}</h1>

<p>Species: {{ pet.species }}</p>
<p>Hunger: {{ pet.hunger }}</p>
<p>{{ pet.name }} says {{ pet.greet() }}!</p>

<a href="/">Go back</a>
```

demo/seed.py
```python
"""Seed file to make sample data for pets db."""

from models import Pet, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
# An alternative if you don't want to drop
# and recreate your tables:
# Pet.query.delete()

# Add pets
whiskey = Pet(name='Whiskey', species="dog")
bowser = Pet(name='Bowser', species="dog", hunger=10)
spike = Pet(name='Spike', species="porcupine")

# Add new objects to session, so they'll persist
db.session.add(whiskey)
db.session.add(bowser)
db.session.add(spike)

# Commit--otherwise, this never gets saved!
db.session.commit()
```

