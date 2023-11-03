"""Sample file demonstrating SQLAlchemy joins & relationships."""

from flask_sqlalchemy import SQLAlchemy

# This is the connection to the database; we're getting this through
# the Flask-SQLAlchemy helper library. On this, we can find the `session`
# object, where we do most of our interactions (like committing, etc.)

db = SQLAlchemy()


def connect_db(app):
    """Connect the database to our Flask app."""

    db.app = app
    db.init_app(app)

##############################################################################
# Model definitions

class Department(db.Model):
    """Department model. A department has many employees"""
    __tablename__ = "departments"
    
    dept_code = db.Column(db.Text, primary_key=True)
    dept_name = db.Column(db.Text, nullable=False, unique=True)
    phone = db.Column(db.Text)
    
class Employee(db.Model):
    """Employee model for single instance"""
    
    __tablename__ = "employees"
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    name = db.Column(db.Text, nullable=False, unique=True)
    
    state = db.Column(db.Text, nullable=False, default='CA')
    
    dept_code = db.Column(db.Text, db.ForeignKey('departments.dept_code'))
    
    dept = db.relationship('Department')
    

    

if __name__ == "__main__":
    # As a convenience, if we run this module interactively, it will leave
    # you in a state of being able to work with the database directly.

    # So that we can use Flask-SQLAlchemy, we'll make a Flask app
    from app import app
    connect_db(app)

    db.drop_all()
    db.create_all()