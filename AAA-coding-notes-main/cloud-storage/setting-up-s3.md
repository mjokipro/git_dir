
---
date: 2023-05-02
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

1. Install boto3 (pip3 install boto3 or npm install boto3)
2.  Get access key from amazon
3. create bucket on s3
4. 


```python
import os # Import os module for env vars and db link (sql-alchemy)
import boto3
import uuid
from dotenv import load_dotenv

from flask import (
	Flask, render_template, redirect, flash, request, jsonify, session
)

from models.models import db, connect_db # sql-alchemy

load_dotenv()

# CURR_USER_KEY = "curr_user"

app = Flask(__name__)
# debug, session -PUT ACTUAL VALUE IN ENV VAR
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get( 
"DATABASE_URL", 'postgresql:///friender') 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['SQLALCHEMY_ECHO'] = True 

connect_db(app) # sql-alchemy

AWS_BUCKET_NAME = os.environ.get['AWS_BUCKET_NAME']
AWS_ACCESS_KEY_ID = os.environ.get['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ.get['AWS_SECRET_ACCESS_KEY']

# connect s3 to flask
s3 = boto3.client(
"s3",
"us-west-1",
aws_access_key_id= AWS_ACCESS_KEY_ID,
aws_secret_access_key= AWS_SECRET_ACCESS_KEY,
)


# POST request route for api form submission
# validate the form submission
# call the model fx - send data besides image to database
# helper fx to send image to s3

@app.post("/user")
def create_user():
	
	# grab user info from request
	# sign up user using all other info
	# get and store new user id in variable
	# commit to database
	# add user to db
	db.session.add(NEW USER)
	db.session.commit()
	
	# grab imgs from request.files
	uploaded_images = request.files.getlist('file'); # MultiDict
	
	# iterate through the images
	
	# create filename using uuid + name of file
	# create new filename for img
	# must be unique within bucket - could use uuid fstring
	key = f"{uuid.uuid4()}-{img.filename}"
	
	# creating a new File with that user id
	# save image file to db
	file = File(
	filename=ORIGINAL FILE NAME,
	aws_key=NEW FILENAME,
	bucket=BUCKET,
	user_id=USER ID FROM NEW USER ABOVE
	)
	
	# add File to database
	db.session.add(file)
	
	# upload image file into s3 bucket
	# store bucket name in .env file, grab from os.envion here
	s3.Bucket(S3_BUCKET_NAME).upload_fileobj(uploaded_file, NEW FILENAME)
	s3.upload_file(img, S3_BUCKET_NAME, key)
	
	# After all iterations:
	# commit all added Files to database
	db.session.commit()
	
	# return 201 / new user json
	return jsonify(NEW USER)
```
