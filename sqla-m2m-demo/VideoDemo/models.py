from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    db.app = app
    db.init_app(app)

# MODELS GO BELOW!


class Department(db.Model):
    """Department Model"""

    __tablename__ = "departments"

    dept_code = db.Column(db.Text,
                            primary_key=True)
    dept_name = db.Column(db.Text,
                            nullable=False, unique=True)
    phone = db.Column(db.Text)

    
    def __repr__(self):
        return f"<Department {self.dept_code} {self.dept_name} {self.phone} >"


class Employee(db.Model):
    """Employee Model"""

    __tablename__ = "employees"

    id = db.Column(db.Integer,
                    primary_key=True, autoincrement=True)
    name = db.Column(db.Text, 
                     nullable=False, unique=True)
    state = db.Column(db.Text, 
                      nullable=False, default='CA')
    
    """Employee -> Department relationships""" 
    ### SQL ### employees.id -> departments.dept_code ### SQL ###
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code'))

    ### SQLA ### Employee.dept = Emp -> Dept -> Emp on Dept.dept_code
    dept = db.relationship('Department', backref='employees')
    
    """Employee -> Projects relationships"""
    ### SQLA ### Employee.assignments = Emp -> EmpProj -> Emp on EmpProj.emp_id
    assignments = db.relationship('EmployeeProject', backref='employee')
    
    """through relationship - can run independant of above relationship"""
    ### SQLA ### Emp -> EmpProj -> Proj -> Emp on EmpProj.proj_code
    projs = db.relationship('Project', 
                                secondary='employees_projects', backref='employees')
     
    def __repr__(self):
        return f"<Employee {self.name} {self.state} {self.dept_code} >"

class Project(db.Model):
    """Project Model"""
    
    __tablename__ = "projects"
    
    proj_code = db.Column(db.Text, primary_key=True)
    
    proj_name = db.Column(db.Text, nullable=False, unique=True)
    
    """Project -> EmpProj relationship"""
    ### SQLA ### Project.assignments = Proj -> EmpProj -> Proj on EmpProj.proj_code     
    assignments = db.relationship('EmployeeProject', backref="project")
    
    def __repr__(self):
        return f"<Project {self.proj_code} {self.proj_name} {self.assignments}>"
    
class EmployeeProject(db.Model):
    """Mapping of an employee to a project."""
    
    __tablename__ = "employees_projects"
    
    ### SQL ### employees_projects.emp_id -> employees.id ### SQL ###
    emp_id = db.Column(db.Integer, 
                        db.ForeignKey("employees.id"), primary_key=True)
    
    ### SQL ### employees_projects.proj_code -> projects.proj_code ### SQL ###
    proj_code = db.Column(db.Text,
                            db.ForeignKey("projects.proj_code"), primary_key=True)
    
    role = db.Column(db.Text)
        
    def __repr__(self):
        return f"<EmployeeProject {self.emp_id} {self.proj_code} {self.role}>"

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

