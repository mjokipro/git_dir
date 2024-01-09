## Goals

-   Make explicit joins while querying in SQLAlchemy
-   Work with many-to-many relationships in SQLAlchemy

## Navigating relationships

- Querying' all and iterating through works — but is inefficient in it’s querying from SQL:
	-   one query to get all the employees
	-   one query for *each* department 
		- This is because ‘emp.dept’ returns an *instance* of that Department

![[many-to-many-sql-alchemy-1678974372830.jpeg]]
- Better way = is to Join them

## Joining

- Instead, can specify joins more directly
	-   Can be more explicit about what you want to get
	-   Connect tables without defined relationships
	-   Can control inner/outer/cross joins

- One outer join:
	- Returns the *data* instead of the *instance*
![[many-to-many-sql-alchemy-1678974323071.jpeg]]
- There may be times you just want the data, but when building apps, you may want the full power of the instance instead.
- % Note that the ‘*FROM* employees’ is because the first argument passed to the db.session.query() is Employee.name.

- One outer join:
	- Returning *instances*
![[many-to-many-sql-alchemy-1678974621085.jpeg]]

- One inner join:
	- Returning *raw data*
![[many-to-many-sql-alchemy-1678974677125.jpeg]]

## Many-to-Many relationships

![[many-to-many-sql-alchemy-1678976569569.jpeg]]

![[many-to-many-sql-alchemy-1678976586718.jpeg]]

### Project

![[many-to-many-sql-alchemy-1678976618938.jpeg]]

demo/models.py
```python
class Project(db.Model):
    """Project. Employees can be assigned to this."""

    __tablename__ = "projects"

    proj_code = db.Column(
        db.Text,
        primary_key=True)

    proj_name = db.Column(
        db.Text,
        nullable=False,
        unique=True)
```

### EmployeeProject

![[many-to-many-sql-alchemy-1678976713827.jpeg]]

demo/models.py
```python
class EmployeeProject(db.Model):
    """Mapping of an employee to a project."""

    __tablename__ = "employees_projects"

    emp_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id"),
        primary_key=True)     # Primary key here 

    proj_code = db.Column(
        db.Text,
        db.ForeignKey("projects.proj_code"),
        primary_key=True)     # AND Primary key here - this is a composite primary key.

    role = db.Column(
        db.Text,
        nullable=False,
        default='')
```
- This creates a **Composite Primary Key** of emp_id & proj_code (in that order)
	- **Composite primary key**s are an elegant way to have primary keys for Join tables
		- Like all primary keys, must be *unique* and *not null*
	- However, would want to use a **serial** key over **composite primary key** if there are any anticipated issues with non-unique entries.
		- e.g. In the example of a movies table, and actors table, and a joined roles table, if there were an actor that had 2 roles in the same movie, would want to use a **serial** key because you couldn’t represent both roles from the same actor if a **composite primary key** was used.

### Relationships

demo/models.py
```python
class Employee(db.Model):   # ...
    # direct navigation: emp -> employee_project & back
    assignments = db.relationship('EmployeeProject', backref='employee')
```

demo/models.py
```python
class Project(db.Model):   # ...
    # direct navigation: proj -> employee_project & back
    assignments = db.relationship('EmployeeProject', backref='project')
```

```python
>>> liz = Employee.query.get(2)
>>> liz.assignments
[<EmployeeProject 2, server>, <EmployeeProject 2, car>]

>>> car = Project.query.get('car')
>>> car.assignments
[<EmployeeProject 2, car>, <EmployeeProject 3, car>]
```

- These instances “stop at” EmployeeProject; though you can access Project instances with extra work
```python
>>> liz.assignments      # Gives a list of *EmployeeProject* instances
[<EmployeeProject 2, server>, <EmployeeProject 2, car>]

>>> liz.assignments[0].project  # Accessing the actual instance of the Project takes extra work
<Project server Deploy Server>
```

### “Through” Relationships

- `db.relationship()`
	- 1st arg: Name of the class to make the connection with. *Capitalized* and *Singular*
	- 2nd arg: Name of the table to go ‘through’ (this is the join table btwn the two). Used for Many:Many relationships
	- 3rd arg: backref to provide the other class with to access 
		- & Make sure to write a comment in the other class to remember that this backref exists!
- & By adding another parameter for `secondary=`, you can ‘build’ a direct road to the Project instances they are associated with
	- Think of `secondary` as *through*

demo/models.py
```python
class Employee(db.Model):   # ...
    # direct navigation: emp -> project & back
    projects = db.relationship(
        'Project', secondary='employees_projects', backref='employees')
```

```python
>>> liz.projects
<Project server Deploy Server>, <Project car Design Car>]

>>> car.employees
[<Employee 2 Liz CA>, <Employee 3 Maggie DC>]
```
- These go “through” `employees_projects` to get result


- You can have both relationships and sometimes this is very useful:
	- Class to join table (Employee to EmployeeProject)
	- Class through the join table to the other Class (Employee through EmployeeProject to Project)
demo/models.py
```python
class Employee(db.Model):   # ...
    # direct navigation: emp -> employee_project & back
    assignments = db.relationship('EmployeeProject', backref='employee')

    # direct navigation: emp -> project & back
    projects = db.relationship(
        'Project', secondary='employees_projects', backref='employees')
```

## Adding To Relationships

- & This gives *very* powerful capabilities!
	- Can add to any part of this relationship - either Class, or the Join table itself and
	  *all other pieces will automatically update*

- On an employee’s projects list (from project instances), can append directly:
	- Nadine’s assignments (from join table) automatically updates
```python
>>> nadine = Employee.query.get(4)
>>> nadine.projects.append(car)
>>> db.session.commit()
>>> nadine.assignments
[<EmployeeProject 4, car>]
```

- On an employee’s assignments (from join table), can append directly:
	- List of projects (from project instances) automatically updates
```python
>>> nadine.assignments.append(
...   EmployeeProject(proj_code='server', role='Tester'))
>>> db.session.commit()
>>> nadine.projects
[<Project server Deploy Server>, <Project car Design Car>]
```

- Can add to the join table directly:
	- Often useful if you have limited information (only keys, etc. for confidentiality or other reasons) and don’t have access to the actual employee or project
```python
>>> m_server = EmployeeProject(emp_id=3, proj_code='server', role='Tester')

>>> db.session.add(m_server)   # need to do this now, though
>>> db.session.commit()
```
