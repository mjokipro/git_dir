"""Seed file to make sample data for pets db"""

from models import Pet, db
from app import app

###########################
# Drop / create all tables
db.drop_all()
db_sess = db.create_all()

###########################
# If table isnt't empty, empty it
Pet.query.delete()

#############
# Create vars to combine for updates
names = ['sushi', 'scout', 'pig', 'carrot']
species = ['pig', 'cat', 'dog', 'turtle']

##############
# Combine vars
zip(names, species)
pets = [Pet(name=n, species=s) for n, s in zip(names, species)]
    
###########################
# Create record (obj used for SQL INSERT) to be staged for COMMIT to db
stevie = Pet(name="Stevie", species="chick", hunger=13)

##############
# UPDATE: prep record (obj used for SQL UPDATE) to be staged for COMMIT to db
stevie.name = 'scout bla'
     
##############
# UPDATE: add record (obj used for SQL INSERT) to staging area for COMMIT to db
db.session.add(stevie)
db.session.add_all(pets)

###########################
# COMMIT to db
db.session.commit()