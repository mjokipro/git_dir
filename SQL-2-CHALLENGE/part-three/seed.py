"""Seed database with sample data from CSV Files."""

from csv import DictReader
from app import db
from models import User, Employee

db.drop_all()
db.create_all()

with open('generator/users.csv') as users:
    db.session.bulk_insert_mappings(User, DictReader(users))

with open('generator/employees.csv') as employees:
    db.session.bulk_insert_mappings(Employee, DictReader(employees))

# with open('generator/follows.csv') as follows:
#     db.session.bulk_insert_mappings(Follows, DictReader(follows))

db.session.commit()
