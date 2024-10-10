

from models import Department, Employee, db
from app import app

# # Create all tables
db.drop_all()
db.create_all()

# Make a bunch of departments
d11 = Department(dept_code="fff", dept_name="Markfffffffftg", phone="afff4")

db.session.add(d11)

db.session.commit()


# # Make a bunch of employees

rer = Employee(name="RivffeffffBttom", state="rY", dept_code="fff")
ar = Employee(name="anfffoth", dept_code="fff")

db.session.add(rer)
db.session.add(ar)
db.session.commit()





Employee.query.delete()
Department.query.delete()


