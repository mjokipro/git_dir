"""Seed database with sample data from CSV Files."""

from csv import DictReader
from app import db
from models import User, Message, Follows


db.drop_all()
db.create_all()

with open('generator/users.csv') as users:
    db.session.bulk_insert_mappings(User, DictReader(users))

with open('generator/messages.csv') as messages:
    db.session.bulk_insert_mappings(Message, DictReader(messages))

with open('generator/tags.csv') as tags:
    db.session.bulk_insert_mappings(tags, DictReader(tags))
    
with open('generator/posts.csv') as posts:
    db.session.bulk_insert_mappings(posts, DictReader(posts))
    
with open('generator/posts_tags.csv') as posts_tags:
    db.session.bulk_insert_mappings(posts_tags, DictReader(posts_tags))

db.session.commit()
