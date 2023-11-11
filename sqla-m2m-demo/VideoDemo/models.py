from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)

# MODELS GO BELOW!


class Department(db.Model):
    """Department Model"""

    __tablename__ = "departments"

    dept_code = db.Column(db.Text, primary_key=True)
    dept_name = db.Column(db.Text, nullable=False, unique=True)
    phone = db.Column(db.Text)

    
    def __repr__(self):
        return f"<Department {self.dept_code} {self.dept_name} {self.phone} >"


class Employee(db.Model):
    """Employee Model"""

    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    state = db.Column(db.Text, nullable=False, default='CA')
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code'))

    # This is the magic line!
    # Sets up a dept attribute on each instance of Employee.
    # SQLA will populate it with data from the departments table automatically!

    dept = db.relationship('Department', backref='employees')
   

    def __repr__(self):
        return f"<Employee {self.name} {self.state} {self.dept_code} >"



def get_directory():
    """Show dept_name & phone"""
    emps = Employee.query.all()

    for emp in emps:
        if emp.dept is not None:
            print(emp.name, emp.dept.dept_name, emp.dept.phone)
        else:
            print(emp.name)
            
    return emps

def phone_dir_nav():
    """Show dept_code & phone"""
    emps = Employee.query.all()

    for emp in emps:  # [<Emp>, <Emp>, ...]
        if emp.dept is not None:
            print(emp.name, emp.dept.dept_code, emp.dept.phone)
        else:
            print(emp.name, "-", "-")

    return emps

def phone_dir_join():
    """Show emps w/ a join."""
    
    directory = (db.session.query(Employee.name,
                             Department.dept_name,
                             Department.phone)
            .join(Department).all())

    for name, dept, phone in directory:  # [(n, d, p), (n, d, p), ...]
        if dept is not None:
            print(name, dept, phone)
        else:
            print(name, "-", "-")

    return directory

def department_employee_id():
    """Show emps w/ a join."""
    
    depts = (db.session.query(Department.dept_name,
                              Employee.id)
            .join(Department).all())

    for dept, emp_id in depts:  # [(d, emp_id), (d, emp_id), ...]
        if emp_id is not None:
            print(dept, emp_id)
        else:
            print(dept, "-")

    return depts

def full_join():
    """Show all emps and all depts"""
    
    depts = (db.session.query(Employee, Department).join(Department).all())
    
    for emp, dept in depts:
        if dept is not None:
            print(emp.name, dept.dept_name, dept.phone)
        else:
            print(dept, "-", "-")
            
    return depts

def full_outer_join():
    """Show all emps and all depts"""
    
    depts = (db.session.query(Employee.name,
                              Department.dept_name,
                              Department.phone).outerjoin(Department).all())
    
    for emp, dept, phone in depts:
        
            print(emp, dept, phone)
         
    return depts

