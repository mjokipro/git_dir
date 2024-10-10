"""Sample file demonstrating SQLAlchemy joins & relationships."""

from flask_sqlalchemy import SQLAlchemy

# step 1: create db instance, define connection
db = SQLAlchemy()

# step 2: connect db
def connect_db(app):
    """Connect the database to our Flask app."""

    db.app = app
    db.init_app(app)
    

##############################################################################
# Model definitions

class Department(db.Model):
    """Department instances having many employees"""
    
    __tablename__ = "departments"
    
    @classmethod
    def get_all_depts(cls):
        return cls.query.all()
    
    dept_code = db.Column(db.Text, primary_key=True)
    dept_name = db.Column(db.Text, nullable=False, unique=True)
    phone = db.Column(db.Text)
    
    employees = db.relationship('Employee', cascade='all, delete-orphan')
    
    def __repr__(self):
        return f"<Department {self.dept_code} {self.dept_name} {self.phone} >"
    
class Employee(db.Model):
    """Employee instance"""
    
    @classmethod
    def get_all_emps(cls):
        return cls.query.all()
    
    __tablename__ = "employees"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)
    state = db.Column(db.Text, nullable=False, default='CA')
    
    
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code'))
    
    # sets up one to many relationship
    dept = db.relationship('Department')
    
    
    def __repr__(self):
        return f"<Employee {self.name} {self.state} {self.dept_code} {self.dept} >"
    
