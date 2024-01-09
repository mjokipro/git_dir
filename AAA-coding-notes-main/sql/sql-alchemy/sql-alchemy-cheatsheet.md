## Handling Optional Inputs in Routes

```python
@app.post("/")
def add_pet():
    """Add pet and redirect to list."""

    name = request.form['name']
    species = request.form['species']
    hunger = request.form['hunger']     # This is optional text input
    hunger = int(hunger) if hunger else None # If provided, set to that input, otherwise, set to None, which will tell SQL Alchemy to set to Null/unknown, which will set the default value if one exists, otherwise will set to Null (if nullable)

    pet = Pet(name=name, species=species, hunger=hunger)
    db.session.add(pet)
    db.session.commit()

    return redirect(f"/{pet.id}")
```

## Making Models

models.py
```python
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Pet(db.Model):
    __tablename__ = "pets"

    # can specify multi-column unique or check constraints like:
    # __table_args__ = (
    #    db.UniqueConstraint("col1", "col2"),
    #    db.CheckConstraint("born <= died") )

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)
    name = db.Column(
        db.String(50),
        db.CheckConstraint('len(name) >= 5'),
        nullable=False,
        unique=True)
    species = db.Column(
        db.String(30),
        nullable=True,
        default="cat")
    hunger = db.Column(
        db.Integer,
        nullable=False,
        default=20)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=db.func.now() )

```

- SQLAlchemy types:
	-   Integer, String(len), Text, Boolean, DateTime, Float, Numeric
- Field options _(all default to False)_:
	-  primary_key, autoincrement, nullable, unique, default (value or callback)
- Creating/Dropping Tables:
	-   `db.create_all()`, `db.drop_all()`

## Making and Deleting Instances

- Making an instance and adding _(only need to do 1st time adding)_:
	-   `fluffy = Pet(name="Fluffy", species="cat")`
	-   `db.session.add(fluffy)` or `db.session.add_all([fluffy, bob])`
- Deleting instance or deleting all matching data:
	-   `db.session.delete(fluffy)` or `Pet.query.filter(...).delete()`

## Getting and Filtering

- Getting record by primary key:
	-   `fluffy = Pet.query.get("fluffy")` or `Pet.query.get_or_404("fluffy")`
- Simple Filtering: _(returns a “query”, not the answer—see fetching below)_
	-   `Pet.query.filter_by(species="cat")`
- Flexible filtering: _(returns “query”)_
	-   `Pet.query.filter(Pet.species == "dog")`
	-   also: `Pet.hunger != 10`, `.filter(Pet.hunger < 10)`
	-   also: `Pet.name.like('%uff%')`, `Pet.name.like('%uff%')`, `Pet.hunger.in_([2, 7])`
	-   OR: `expr | expr`, AND: `expr & expr`, NOT: `~ expr`
- Grouping, Ordering, Offsetting, Limiting:
	-   `.group_by('species', 'age')`
	-   `.group_by('species').having(db.func.count() > 2)`
	-   `.order_by('species', 'age')`, `.offset(10)`, `.limit(10)`
- Getting lightweight tuples, not instances of model class:
	-   `db.session.query(Pet.name, Pet.hunger)` → `[("fluffy", 10), ("bob", 3)]`
- Fetching:
	-   `query.get(pk)`
	-   `query.get_or_404(pk)` _(Flask-specific: get or raise 404)_
	-   `query.all()` _(get all as list)_
	-   `query.first()` _(get first record or None)_
	-   `query.one()` _(get first record, error if 0 or if > 1)_
	-   `query.one_or_none()` _(get first record, error if > 1, None if 0)_
	-   `query.count()` _(returns # of elements)_

## Transactions

- “Flushing” _(sending SQL to database, but doesn’t commit transaction yet)_
	-   `db.session.flush()`
- Committing or rolling back transactions:
	-   `db.session.commit()`, `db.session.rollback()`

## Handling Errors

- Import SQLA exception classes from sqlalchemy.exc, like this:
```python
from sqlalchemy import exc

try:
    User.query.delete()  # delete all users
except exc.IntegrityError:
    print("Cannot delete users because of ref integrity!")
```

## Relationships

```python

class Employee(db.Model):

    __tablename__ = "employees"
    
    id = db.Column(
	    db.Integer, 
	    primary_key=True,
	    autoincrement=True
	)
    
    dept_code = db.Column(
	    db.Text,
	    db.ForeignKey('depts.dept_code')
	    nullable=False,
	)
    # remember to make foreign keys `nullable=False` if required!


class Department(db.Model):

    __tablename__ = "depts"
    
    dept_code = db.Column(db.Text, primary_key=True)
    
    employees = db.relationship('Employee', backref='department')
```

- Can navigate like:
```python
>>> jane.department     #  <Department finance>
>>> finance.employees   #  [<Employee jane>, <Employee bob>]
```

- Can add/remove/clear foreign key data via relationships:
```python
>>> finance.employees.append(bob)
>>> finance.employees.remove(bob)
>>> finance.employees.clear()
```

## Many to Many Relationships

```python
class Employee(db.Model):
    __tablename__ = "emps"
    id = db.Column(db.Integer, primary_key=True, auto_increment=True)
    # can nav from employee to projects, or project to employees
    projects = db.relationship(
      'Project', secondary='assignments', backref='employees')

class Project(db.Model):
    __tablename__ = "projs"
    code = db.Column(db.Text, primary_key=True)

class Assignment(db.Model):
    __tablename__ = "assignments"
    emp_id = db.Column(
        db.Integer,
        db.ForeignKey("emps.id"),
        primary_key=True)
    proj_code = db.Column(
        db.Text,
        db.ForeignKey("projs.code"),
        primary_key=True)
    role = db.Column(db.Text, nullable=False, default='')

    # if you want to nav emp<->assignment and project<->assignment
    project = db.relationship("Project", backref="assignments")
    project = db.relationship("Employee", backref="assignments")
```

- Can navigate like:
```python
>>> jane.projects        # [<Project A>, <Project B>]
>>> proj_a.employees     # [<Employee 1>, <Employee 2>]

>>> jane.assignments     # [<Assignment jane A>, <Assignment jane B>]
>>> proj_a.assignments   # [<Assignment jane A>, <Assignement bob A>]
>>> asn_jane_a.employee  # <Employee 1>
>>> asn_jane_a.project   # <Project A>
```

- Can add/edit/remove foreign key data via relationships:
```python
>>> jane.projects.add(project_a)
>>> jane.projects.remove(project_a)
>>> jane.projects.clear()

>>> jane.assignments.add(Assignment(proj_code='a', role='Chair'))
```
