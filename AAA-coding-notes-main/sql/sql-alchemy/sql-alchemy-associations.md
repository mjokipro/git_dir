## Goals

-   Translate relationships between tables to relationships  
    between Python classes
-   Deeper dive into SQLAlchemy querying
-   Compare different approaches to querying in SQLAlchemy

### Example: employees & departments

![[sql-alchemy-associations-1678892937969.jpeg]]

![[sql-alchemy-associations-1678892952209.jpeg]]

## Relationships

### Related tables

![[sql-alchemy-associations-1678893178959.jpeg]]

demo/models.py
```python nums
class Department(db.Model):
    """Department. A department has many employees."""

    __tablename__ = "departments"

    dept_code = db.Column(
        db.Text,
        primary_key=True)

    dept_name = db.Column(
        db.Text,
        nullable=False,
        unique=True)

    phone = db.Column(db.Text)
```
demo/models.py
```python nums {2-4}
class Employee(db.Model):   # ...
    dept_code = db.Column(
        db.Text,
        db.ForeignKey('departments.dept_code'))  # This is like the REFERENCES keyword in SQL. -- but here in python, we do need to specify which column within the referenced table (in this case, departments) to set the foreign key to  (SQL sets this automatically on the primary key by default)
```
-   Add an actual field, *dept_code*
-   *ForeignKey* makes primary/foreign key relationship
    -   Foreign key goes on the “many” of the ‘1:M’ relationship  
        - in this case, one dept: many employees, would go on employee
        - This is also what allows SQL Alchemy to inherently understand that this is a 1:M relationship, b/c the foreign key goes on the ‘many’
    -   Parameter is string “tablename.fieldname”
    -   Database will handle referential integrity


![[sql-alchemy-associations-1678893346921.jpeg]]
demo/models.py
```python nums {6}
class Employee(db.Model):   # ...
    dept_code = db.Column(
        db.Text,
        db.ForeignKey('departments.dept_code'))  # Need this 

    dept = db.relationship('Department')  # But, this is where the magic happens

```
-   relationship allows SQLAlchemy to “navigate” this relationship
    -   Creates an instance of a relationship –> We get this from SQL Alchemy
    -   Using the name *dept* on an Employee class
        - This gives th convenience of ‘walking’ to another class easily based on this relationship

![[sql-alchemy-associations-1678893400244.jpeg]]
```python nums {2}
class Department(db.Model):   # ...
    employees = db.relationship('Employee')
```
-   Can get list of employee objects from dept with `.employees`
	- & This is a list of *actual Instances* of employees!

- @ Tip **Backreference**
	- You can specify both “ends” of a database relationship as shown above: going from an employee to their department with `.dept` and from a department to their employees with `.employees`.
	- SQLAlchemy also allows a shortcut that offers advantages—you can just declare one relationship, and note the “backreference” for it.
	- To do this, you wouldn’t need .employees attribute on the Department class and could just put this on the Employee class:
```python
dept = db.relationship( 'Department', backref='employees')
```
- Either direction for backref gives the same results—
	- you can navigate from an employee to their department and from a department to its employees, so which you use is a matter of aesthetic preference.

### Navigating

```python
class Employee(db.Model):    # ...
    dept = db.relationship('Department')

class Department(db.Model):  # ...
    employees = db.relationship('Employee')
```

can navigate emp → dept with .dept
```python
>>> leonard = Employee.query.filter_by(name='Leonard').one()

>>> leonard.dept_code
'legal'

>>> leonard.dept
<Department legal Legal>
```

can navigate dept → emp with .employees
```python
>>> legal = Department.query.get('legal')

>>> legal.employees
[<Employee 1 Leonard CA>, <Employee 2 Liz CA>]
```

### Short-hand defining with backref

longer way
```python
class Employee(db.Model):    # ...
    dept = db.relationship('Department')

class Department(db.Model):  # ...
    employees = db.relationship('Employee')
```

short-hand way using backref
```python
class Employee(db.Model):    # ...
    dept = db.relationship('Department', backref='employees')

class Department(db.Model):  # ...
    # don't need to specify here; will auto-magically get
    # .employees to navigate to employees because of backref
```

- & There are subtle benefits to the short-hand method: *always do it this way.*

## Using relationships

- Goal: “Show phone directory of employees and their dept.”
| Name | Department | Phone |
| --- | --- | --- |
| Leonard | Legal | 555-2222 |
| Liz | Legal | 555-2222 |
| Maggie | Marketing | 555-9999 |
| Nadine | \- | \- |

### Navigating

demo/models.py
```python
def phone_dir_nav():
    """Show phone dir of emps & their depts."""

    emps = Employee.query.all()

    for emp in emps:  # [<Emp>, <Emp>]
        if emp.dept is not None:
            print(emp.name, emp.dept.dept_code, emp.dept.phone)
        else:
            print(emp.name, "-", "-")
```

-  Yay! So pretty! So easy!
- BUT - This is inefficient because SQLAlchemy fires off several queues:
	-   one for the list of employees
	-   one for _each_ department
- This can be optimized when you need it to be. #rithmRefactor  link with [[many-to-many-sql-alchemy#Navigating relationships]]

## Querying

demo/models.py
```python
class Employee(db.Model):
    """Employee."""

    __tablename__ = "employees"

    id = db.Column(
        db.Integer,
        primary_key=True,
        autoincrement=True)

    name = db.Column(
        db.Text, nullable=False,
        unique=True)

    state = db.Column(
```

```sql
SELECT * FROM employees
WHERE name = 'Liz';
```

shorter form, for simple cases
```python
Employee.query.filter_by(name='Liz')
```

longer form, can use other operators
```python
Employee.query.filter(Employee.name == 'Liz')
Employee.query.filter(Employee.id > 1)
```

### Chaining

```python
new_emps = Employee.query.filter(Employee.id > 1)

just_ca = new_emps.filter(Employee.state == 'CA')
```

- Remember: nothing runs until we get results:
```python
>>> just_ca
<flask_sqlalchemy.BaseQuery at 0x105234750>

>>> just_ca.all()
[<Employee 2 Liz CA>, <Employee 4 Nadine CA>]
```
- Allows a question to be ‘built-up’, until it’s ready to be asked

### More flexible filtering

```sql
SELECT * FROM employees
WHERE name = 'Liz';
```

Simple version: `ClassName.query`
```python
Employee.query.filter_by(name='Liz')
Employee.query.filter(Employee.name == 'Liz')
```

More flexible version: `db.session(thing, ...).query`
```python
db.session.query(Employee).filter_by(name='Liz')
db.session.query(Employee).filter(Employee.name == 'Liz')
```
- & This doesn’t seem to gain us anything, but this general form of `db.session.query(...)` allows us to query more flexibly than a single model class.

### Returning rows

```sql
SELECT id, name FROM employees;
```

```python
>>> emps = db.session.query(Employee.id, Employee.name).all()
[(1, 'Leonard'), (2, 'Liz'), (3, 'Maggie'), (4, 'Nadine')]

>>> type(emps[0])
sqlalchemy.engine.row.Row
```

- & This is actually a list of rows (it may _look like_ a tuple, but don’t be fooled!).
- This is useful if we just need to display data and don’t need to call methods on our models (we’d need full instances for that).
- A row can be turned into a tuple:
```python
>>> emp_tuples = [(e.id, e.name) for e in emps]

>>> type(emp_tuples[0])
tuple
```

### Get by PK

```python
>>> Department.query.filter_by(dept_code='fin').one()
<Department fin Finance>
```

```python
>>> Department.query.get('fin')
<Department fin Finance>

>>> Department.query.get_or_404('fin')
<Department fin Finance>
```

## Common Operators

### Operators

```python
Employee.query.filter(Employee.name == 'Jane')    # EQUAL

Employee.query.filter(Employee.name != 'Jane')    # NOT EQUAL

Employee.query.filter(Employee.id > 65)           # LESS THAN / GREATER THAN

Employee.query.filter(Employee.name.like('%Jane%'))    # LIKE

Employee.query.filter(Employee.id.in_([22, 33, 44]))   # IN ()

Employee.query.filter(Employee.state == None)     # IS NULL
Employee.query.filter(Employee.state.is_(None))   # also IS NULL

Employee.query.filter(Employee.state != None)     # IS NOT NULL
Employee.query.filter(Employee.state.isnot(None)) # also IS NOT NULL
```

AND:
```python
q.filter(Employee.state == 'CA', Employee.id > 65)

q.filter( (Employee.state == 'CA') & (Employee.id > 65) )
```

OR:
```python
q.filter( db.or_(Employee.state == 'CA', Employee.id > 65) )

q.filter( (Employee.state == 'CA') | (Employee.id > 65) )
```

NOT:
```python
Employee.query.filter( db.not_(Employee.state.in_(['CA', 'OR'])) )

Employee.query.filter( ~ Employee.state.in_(['CA', 'OR']) )
```

## Learning more

### Self-learning

```python
q = Employee.query

q.group_by('state')

q.group_by('state').having(db.func.count(Employee.id) > 2)

q.order_by('state')

q.offset(10)

q.limit(10)

```

- All described at [Query Docs](http://docs.sqlalchemy.org/en/rel_1_0/orm/query.html#sqlalchemy.orm.query.Query.offset)

## Resources

- [SQLAlchemy Docs](http://docs.sqlalchemy.org/en/latest/) 
	- % Note: very comprehensive, may be overwhelming
- [Flask-SQLAlchemy Docs](https://pythonhosted.org/Flask-SQLAlchemy/)

