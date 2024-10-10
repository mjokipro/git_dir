#rithm  #Flask #SQLAlchemy #React #PostgreSQL 

# Canvasses

#### Backend

![[friender-BACKEND.canvas|friender-BACKEND]]

#### Frontend

![[friender-FRONTEND.canvas|friender-FRONTEND]]

#### Database

![[friender-DATABASE.canvas|friender-DATABASE]]
# Master's degree

![[masters-degree-youtube-university.png]]

# Notes

#### Instructions

**Friender**
Like Tinder, but for making social friends as an adult!

- Login/authentication is required.
- Users are required to complete a profile that includes hobbies, interests, and a location (zip code), and friend radius.
- Users can optionally upload photos (Images are stored to Amazon S3, not in the database).
- Users should be shown other users (hobbies, interests, pics) whose location is within friend radius.
- User can select yes or no for each user shown to indicate a potential friend match.
- Once a user says yes or no to another shown user, they should not see this user again.
- If two users both say yes for friend match, they should be able to message each other.

#### Questions

##### Storing images in user object - URLs or keys?

```python
# create user from form data
new_user = User(
	username=username, 
	password=hashed_password, 
	email=email, 
	hobbies=hobbies, 
	interests=interests, 
	location=location, 
	friend_radius=friend_radius,
	image_keys=[], # do we need to store both keys and urls here?
	image_urls=[] # presigned urls expire - so maybe not
)
```

##### How to set up the bucket for our app?

Create two buckets, share one bucket? 

- Create a bucket policy?
- Create an IAM user?
- Access points?
- Create access keys as root user - are we missing any steps?

Create two buckets and swap?

**Terry's question:**
Should we be creating the access key as root user or should we create an IAM user?
**Brit's response:**
I would create for root user!

#### Links

[Google doc](https://docs.google.com/document/d/1_lyEtscJz7Srw5_fFCFbig7vlZFHgAqXxSLw0-8mVpo/edit?usp=sharing).

### Backend
#### Using Flask

```
python3 -m venv venv
source venv/bin/activate

ipython
%run fily.py
%run seed.py

pip3 install -r requirements.txt
pip3 freeze > requirements.txt

flask run
```

#### Amazon S3

##### Using S3

###### Manage via web dashboard

https://s3.console.aws.amazon.com/s3/home

###### Manage via shell/CLI

https://aws.amazon.com/cli/

```
$ aws s3 ls s3://your-bucket
$ aws s3 cp localfile s3://your-bucket/
```

###### Manage via JavaScript

[AWS SDK for JavaScript](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-examples.html)

###### Manage via Python/Flask

Documentation:

https://aws.amazon.com/sdk-for-python/

Installation:

```
pip install boto3
```

Set up:

*.env*
```python
FLASK_APP=app.py
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_DEFAULT_REGION=us-east-1
S3_BUCKET_NAME=ad-vk-friender
```

-  The `.env` file is used to define environment variables that can be loaded into your application's environment at runtime.
- Any environment variables defined in the `.env` file will be available in the `os.environ` dictionary. 

*app.py*
```python
from flask import Flask

# load the environment variables from .env 
from dotenv import load_dotenv

# import jwt
from flask_jwt_extended import 
	get_jwt_identity, jwt_required, create_access_token

# removes/replaces potentially dangerous characters from filenames
# may not be necessary
from werkzeug.utils import secure_filename

import os
import boto3 # aws sdk for python
import uuid

# connect S3 to flask
s3 = boto3.client(
  "s3",
  "us-west-1",
  aws_access_key_id= os.environ.get('AWS_ACCESS_KEY_ID'),
  aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY'),
)

# get bucket name from .env
S3_BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
# or
S3_BUCKET_NAME = os.environ.get('S3_BUCKET_NAME')

---------------------------------------------------------------------

# get Bucket resource
# allows you to interact with its contents, eg:
# upload, download, delete, list
s3_bucket = s3_resource.Bucket(bucket_name)

# retrieve Object resource representing object/file from Bucket
image_object = s3_bucket.Object(image_key)
# or
image_object = s3.Object(bucket_name, image_key)

# get file binary data from Object
image_data = image_object.get()['Body'].read()

```

*seed.py*
```python
from app import app
from models import db, Cupcake

db.drop_all()
db.create_all()

c1 = Cupcake(
    flavor="cherry",
    size="large",
    rating=5,
)

db.session.add_all([c1, c2])
db.session.commit()
```

##### Buckets 🪣 and permissions

###### Bucket policy

The bucket policy is stored within the bucket itself:
	*Console > Buckets > ad-vk-friender > Permissions > Bucket policy*

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowAlyssasusernameAccess",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::XXXXXXXXXXXX:user/alyssasusername"
            },
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket",
                "s3:GetBucketLocation",
                "s3:ListBucketMultipartUploads",
                "s3:AbortMultipartUpload",
                "s3:ListMultipartUploadParts"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name/*",
                "arn:aws:s3:::your-bucket-name"
            ]
        }
    ]
}
```

- Allows the user with the username `"alyssasusername"` to perform all:
	- **Object-level actions**: GetObject, PutObject, DeleteObject) 
	- **Bucket-level actions**: ListBucket, GetBucketLocation, ListBucketMultipartUploads, AbortMultipartUpload, ListMultipartUploadParts
	On your S3 bucket named `"your-bucket-name"`. 
	
- Replace `"XXXXXXXXXXXX"` with your AWS account ID in the policy.

###### Serving files from buckets

Check that your bucket security allows it.
Get a URL or “presigned URL” (time-expiring) via the API.

###### Identity and Access Management dashboard

[Identity and Access Management (IAM) dashbaord](https://us-east-1.console.aws.amazon.com/iamv2/home#/home)

- Access management > Users > Add users by username or access key
- Sign-in URL for IAM users in this account:
  https://417131003947.signin.aws.amazon.com/console

##### Videos

###### Video: Image and File Uploading in React JS wth Axios and FormData

[Code with Yousaf - Image and File Uploading in React JS wth Axios and FormData](https://youtu.be/YOGgaYUW1OA)

![[Pasted image 20230503224651.png]]

###### Video: S3 + Flask | Uploading files to S3 from your website

[HackerShrine - AWS S3 + Flask | Uploading files to S3 from your website](https://www.youtube.com/watch?v=EvHltGpbSqo)

![[Pasted image 20230503001135.png]]

###### Video: Getting started with Amazon S3

[AWS - Getting started with Amazon S3](https://www.youtube.com/watch?v=e6w9LwZJFIA)

- Unblocking all public access should be a last resort.
	- Recommends using S3 Bucket Policies or S3 Access Points.

- File can only be accessed through `Open`, `Download`, or `Download as` buttons.
	- URL listed in file's proprty tab is inaccessible to the public, since public access is disabled.
	- Generates a presigned URL that grants us access to the object for five minutes.
	- Can generate a presigned URL under `Object actions` dropdown menu.

###### Video: How to Upload Files to AWS S3 in Flask

[Pretty Printed - How to Upload Files to AWS S3 in Flask](https://www.youtube.com/watch?v=tSfdQJvTKmk)

**Step 1:**

```
npm install boto3
```

**Step 2:**

Need some credentials:
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html

Follow instructions here to create an "access key" - which will be put in a file in your file system that AWS is automatically going to read from.

**Step 3:**

Create bucket.

#### Authorization with JWT

##### jwt_flask_extended

###### localStorage

```python
async function login() {
  const response = await fetch('/login_without_cookies', {method: 'post'});
  const result = await response.json();
  localStorage.setItem('jwt', result.access_token);
}

function logout() {
  localStorage.removeItem('jwt');
}

async function makeRequestWithJWT() {
  const options = {
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    }
  };
  const response = await fetch('/protected', options);
  const result = await response.json();
  return result;
}
```

##### Installation

```
pip install flask-jwt-extended
```

##### JWT methods

`jwt-required`
Protect a Flask route or endpoint, requiring a valid JWT token to be included in the request headers.

```python
from flask_jwt_extended import jwt_required

@app.route('/protected')
@jwt_required()
def protected():
    return jsonify({'message': 'Access granted only with JWT token.'})
```

`create-access-token`
Create an access token, which can be included in the response to a successful login or registration request.

```python
from flask_jwt_extended import create_access_token

@app.route('/login', methods=['POST'])
def login():

    # authenticate user
	user = User.query.filter_by(
		username=request.json.get('username')
	).first()

    if not user or not user
	    .check_password(request.json.get('password')):
	        return jsonify(
		        {'message': 'Incorrect username or password'}
	        ), 401
        
    # create access token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({'access_token': access_token})
```

`get_jwt_identity`
Retrieve the current user's identity from the JWT token.

```python
from flask_jwt_extended import get_jwt_identity, jwt_required

@app.route('/protected')
@jwt_required()
def protected():

	# extract user id and query db
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    
    return jsonify({'message': f'Welcome {user.username}!'})
```

##### Traditional login with session

![[Pasted image 20230503112557.png]]

- Main difference: user info is stored on the server.
	- Server uses session ID to look up user info.

##### Login with JWT

![[Pasted image 20230503112511.png]]

- Server creates JWT, serializes it, and signs it with secret key.
- Sends JWT to browser containing user information.
- User info is stored client-side.
	- Allows you to use same JWT accross multiple servers you run.

#### Routes 

##### POST /upload

![[Pasted image 20230503163550.png]]

Issues:

- Didn't add `AWS_ACCESS_KEY_ID` or `AWS_SECRET_KEY`.
- Change header to `Content-Type multipart/form-data`.
- Attempting to upload image `File`, not the inputted image: 

```python
# change
s3.upload_file(new_img, AWS_BUCKET_NAME, key)
# to
img_contents = img.read()
s3.put_object(
	Body=img_contents, 
	Bucket=AWS_BUCKET_NAME, 
	Key=key
)
```

```python
@app.post("/upload")
def upload_img():
    """Handle profile image upload

    Create new File for profile image(s) and add to db.
    Uploads profile image(s) to S3 bucket.

    Returns ?
    """

    # grab imgs from request.files
    uploaded_imgs = request.files.getlist('file')  # MultiDict

    # iterate through the images
    for img in uploaded_imgs:

        # read the contents of the image file
        img_contents = img.read()

        #   create filename using uuid + name of file
        #   create new filename for img
        #   must be unique within bucket - could use uuid fstring
        key = f"{uuid.uuid4()}-{img.filename}"

        #   creating a new File with that user id
        #   save image file to db
        new_img = File(
            filename=img.filename,
            aws_key=key,
            bucket=AWS_BUCKET_NAME,
            user_id=6 # grab this from jwt
        )

        #   add File to database
        db.session.add(new_img)

        #   upload image file into s3 bucket
        s3.put_object(
	        Body=img_contents, 
	        Bucket=AWS_BUCKET_NAME, 
	        Key=key
        )

    # After all iterations:
    # commit all added Files to database
    db.session.commit()

    return "Uploaded!"
```

Could possibly be rewritten as:

```python
@app.post("/upload")
def upload_img():
    """Handle profile image upload

    Create new File for profile image(s) and add to db.
    Uploads profile image(s) to S3 bucket.

    Returns ?
    """
    
    # grab imgs from request.files
    uploaded_imgs = request.files.getlist('file')  # MultiDict

    # iterate through the images
    for img in uploaded_imgs:
    
        #   create filename using uuid + name of file
        #   create new filename for img
        #   must be unique within bucket - could use uuid fstring
        key = f"{uuid.uuid4()}-{img.filename}"

        #   creating a new File with that user id
        #   save image file to db
        new_img = File(
            filename=img.filename,
            aws_key=key,
            bucket=AWS_BUCKET_NAME,
            user_id=6 # grab this from jwt
        )

        #   add File to database
        db.session.add(new_img)

        #   upload image file into s3 bucket
        s3.upload_file(img, AWS_BUCKET_NAME, key)

    # After all iterations:
    # commit all added Files to database
    db.session.commit()

    return "Uploaded!"
```

##### POST /users

```python
# generates unique key values for image filenames
import uuid

# sanitizes filenames
# an additional layer of security, may not be necessary:
# uuid will be unique and free of potentially harmful characters
from werkzeug.utils import secure_filename

from flask import jsonify


@app.post('/users')
def create_user():
	"""Handle user signup.

    Create new User and add to db.
    Create new File for profile image(s) and add to db.
    Uploads profile image(s) to S3 bucket.
    
    Returns new user JSON data:
    { 
	    "user": {
		    id, 
		    username, 
		    password,
		    email, 
		    [img_urls], 
		    [img_keys],
		    hobbies, 
		    interests, 
		    location, 
		    friend_radius
		}
    }
    """

# GENERATE USER - could be user @classmethod signup -----------------

    # get form data from request body
    username = request.form.get('username')
    password = request.form.get('password')
    hashed_password = # hash - or will this be hashed already?
    email = request.form.get('email')
    hobbies = request.form.get('hobbies')
    interests = request.form.get('interests')
    location = request.form.get('location')
    friend_radius = request.form.get('friend_radius')
    
    # create user from form data
    new_user = User(
	    username=username, 
	    password=hashed_password, 
	    email=email, 
	    hobbies=hobbies, 
	    interests=interests, 
	    location=location, 
	    friend_radius=friend_radius,
	    image_keys=[], # do we need to store both keys and urls here?
	    image_urls=[] # presigned urls expire - so maybe not
    )

# RETRIEVE / UPLOAD / SET IMAGES ------------------------------------

	# get file binary data from request
	# 'file' = name value of file input in form
	image = request.files['file']
	
	# get list of file binary data
	images = request.files.getlist('file')
		
    for image in images:

		# generate a secure version of a filename
		# may want to append extension if not included
		# optional
		filename = secure_filename(image.filename)

        # generate unique key representing name of file in bucket
        # used to retrieve files
        # optional - defaults to filename
	    key = f"/users/{uuid.uuid4()}-{file_data.filename}"
	    
	    # add image key to new user for later url retrieval
	    new_user['image_keys'].push key
        
        # upload file to bucket
        s3.upload_file(file, S3_BUCKET_NAME, key)
        # or
	    s3.upload_fileobj(file_data, S3_BUCKET_NAME, key)
		# or
		s3.upload_file(
			Bucket = BUCKET_NAME,
			Filename = filename,
			Key = key
		)

    # add image keys to user
    image_keys = new_user['image_keys']
    
    # generate a signed URL for each image key
    image_urls = [get_s3_presigned_url(key) for key in image_keys]
    
	# add image urls to user
    new_user['image_urls'] = image_urls  

# RETURN NEW USER JSON DATA -----------------------------------------

	# create response with only desired fields
	# omits password and image keys
	response_data = {
	    "id": new_user.id,
	    "username": new_user.username,
	    "email": new_user.email,
	    "image_urls": new_user.img_urls,
	    "hobbies": new_user.hobbies,
	    "interests": new_user.interests,
	    "location": new_user.location,
	    "friend_radius": new_user.friend_radius
	}

return jsonify({"user": user_data})
```

Filenames:

- Choose a unique key for each file - S3 does not allow multiple files with the same key in the same bucket.
- S3 identifies objects by the combination of the bucket name and the object key, so as long as the object key is unique within the bucket, you can use any file name you like.
- It's generally a good idea to use a unique identifier like a UUID as part of the object key, especially if your application allows users to upload files with the same name. 

##### Create dessert from posted JSON data and return it

If request is made with `Content-Type: application/json`:
- It won’t be in `request.args `or `request.form`
- It will be inside of `request.json`.
- 
Python can’t just “turn your objects into JSON.”
- Requires a process called serialization.

*demo/app.py*
```python
@app.post("/desserts")
def create_dessert():
    """Create dessert from posted JSON data & return it.

    Returns JSON {'dessert': {id, name, calories}}
    """

    name = request.json["name"]
    calories = request.json["calories"]

    new_dessert = Dessert(name=name, calories=calories)

    db.session.add(new_dessert)
    db.session.commit()

    serialized = new_dessert.serialize()

    # Return w/status code 201 --- return tuple (json, status)
    return (jsonify(dessert=serialized), 201)
```

##### RESTful routes

[Link to REST and JSON APIs lecture](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/flask-rest-json-api/handout/index.html?AWSAccessKeyId=AKIA6I7NF475LYNA7YJL&Signature=tkREu9GopVOA7UWAkxkRgznl%2BXA%3D&Expires=1683107754).

![[Pasted image 20230502223354.png]]

![[Pasted image 20230502223004.png]]

#### Models

##### SQLAlchemy data types

Integer
String
Text
Float
Boolean
DateTime
Date
Time
Interval
Enum
JSON
PickleType
LargeBinary

##### Like / Dislike

*flask-warbler-solution/models.py*
```python
class Follows(db.Model):
    """Connection of a follower <-> followed_user."""

    __tablename__ = 'follows'

    user_being_followed_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete="cascade"),
        primary_key=True,
    )

    user_following_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id', ondelete="cascade"),
        primary_key=True,
    )
```

##### User

**Authenticate:**

*flask-warbler-solution/models.py*
```python
@classmethod
def authenticate(cls, username, password):
	"""Find user with `username` and `password`.
	
	Searches for user with matching password hash.
	If found, returns that user object.

	If not, returns False.
	"""

	user = cls.query.filter_by(username=username).first()

	if user:
		is_auth = bcrypt.check_password_hash(user.password, password)
		if is_auth:
			return user

	return False
```

**Logout:**

- JWT tokens are stored on the client-side (e.g. in local storage or cookies), and are not managed on the server side. 
	- When a user logs out, it is typically enough to remove the token from the client-side storage.

- JWT tokens are stateless, meaning once they are issued, the server has no control over them. 
	- Therefore, logging out with JWT tokens usually involves either:
	  
		1. Setting an expiration time for the token so that it will expire after a certain amount of time, requiring the user to re-authenticate.
		2. Maintaining a blacklist of revoked tokens on the server and checking each incoming token against the blacklist before allowing access.

### Frontend

#### Forms

##### Uploading images

```
<form action="/upload" method="post" enctype="multipart/form-data">
	<input type="file" name="file" value="file">
	<input type="submit" name="upload" value="Upload">
</form>
```
