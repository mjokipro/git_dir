"""Seed file to make sample data for pets db."""

from models import User, db
from app import app


# """Create all tables"""
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()

###########################
# Create vars to combine
first_names = ['tim', 'yo blubs', 'deez nuts', 'butt', 'cup','stup', 'carrot']
last_names = ['pig', 'pig', 'turtle', 'cat', 'cat', 'dog', 'turtle']
    
# Combine vars
zip(first_names, last_names)
names = [User(first_name=f, last_name=l) for f, l in zip(first_names, last_names)]

# Add Users
whiskey = User(first_name='dude', last_name="please", image_url='bla')
bowser = User(first_name='plus', last_name="minus", image_url='bla')
spike = User(first_name='Spike', last_name="porcupine", image_url='bla')

# Add new objects to session, so they'll persist
db.session.add(whiskey)
db.session.add(bowser)
db.session.add(spike)
db.session.add_all(names)

# Commit--otherwise, this never gets saved!
db.session.commit()
