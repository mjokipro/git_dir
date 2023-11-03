"""Seed file to make sample data for db."""

from models import Department, Employee, db
from app import app

# # Create all tables
db.drop_all()
db.create_all()

# Make a bunch of departments
d11 = Department(dept_code="vmg", dept_name="Marktg", phone="a4")

db.session.add(d11)

db.session.commit()


# # Make a bunch of employees

rier = Employee(name="RiveBttom", state="rY", dept_code="vmg")
another = Employee(name="anoth", dept_code="mkg")

db.session.add(another)

db.session.commit()





Employee.query.delete()
Department.query.delete()


