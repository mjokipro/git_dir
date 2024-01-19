"""Seed file to make sample data for pets db."""
import datetime
from models import db, User, Post, Tag, PostTag
from app import app


# """Create all tables"""
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()
Post.query.delete()
PostTag.query.delete()
Tag.query.delete()

# create 3 instances of User class
mike = User(first_name='Mike', last_name="Duley", image_url='bla')
steve = User(first_name='Steve', last_name="Plus", image_url='bla')
spike = User(first_name='Spike', last_name="Davis", image_url='bla')

###########################
# Create 7 users to combine
first_names = ['Barry', 'Tommy', 'Lee', 'Bart', 'Tim','Rick', 'Linda']
last_names = ['Grace', 'James', 'Sumner', 'Lester', 'Cantey', 'Joki', 'Joki']
    
# Combine 7 users tuples (first_name, last_name)
names = [User(first_name=f, last_name=l) for f, l in zip(first_names, last_names)]


# Add 10 new objects to session, so they'll persist
db.session.add_all([mike, steve, spike])
db.session.add_all(names)

# Commit-13-otherwise, this never gets saved!
db.session.commit()

# create 8 instances of Post(title, content, user_id(int:FK))
post1 = Post(title="Jesus is the Son of God!", content="God's Son, the Lord Jesus Christ, is both God and man!", user_id=1)
post2 = Post(title="The blood Jesus shed on the cross covers sinners in His white robe of righteousness!", content="As Christians, this is only one of the infinite blessings given freely by God that assures us of our salvation.", user_id=2)
post3 = Post(title="God is good!", content="God's definition of good differs from mans'.  Only the Triune God (Father, Son, and Holy Spirit) are truely good.  Therefore, by God's perfect, holy and righteous standard (good), none of us are worthy to be in His presance.  We need the Lord Jesus Christ to reunite us with God; there is no other way to Him but through His Son.", user_id=2)
post4 = Post(title="God is Trinitarian!", content="There is one God consisting of three persons; Father, Son, and Holy Spirit.", user_id=4)
post5 = Post(title="God is omnipresent!", content="God is ever present, everywhere, all the time.  Only God can exist in 2 or more places at the same time.", user_id=3)
post6 = Post(title="God is omniscient!", content="God is the living, all-knowing Master Planner of His universe.  He is the beginning, and He is the end of time and eternity.", user_id=1)
post7 = Post(title="God is omnipotent!", content="God is the all-powerful creator of all things, and His most deared creation, humans, are created in His image.", user_id=2)
post8 = Post(title="God is just!", content="God is love, but He must also be just.  He sent His son, the Lord Jesus Christ, to die for the sins of man.  We receive God's forgiveness through the Lord Jesus; those who do not come to faith and repentance in the Lord Jesus will be cast away forever in hell, separated from God and His kingdom in heaven for eternity.", user_id=4)

# # Add 8 posts and commit to db
db.session.add_all([post1, post2, post3, post4, post5, post6, post7, post8])

db.session.commit()

tags = [Tag(name='happy'), Tag(name='sad'), Tag(name='saved'), Tag(name='forgiven')]

db.session.add_all(tags)

db.session.commit()

tg1 = PostTag(post_id=1, tag_id=2)


db.session.add(tg1)
db.session.commit()
