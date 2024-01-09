
---
date: 2023-05-05
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

###### Flask_Jwt_Extended's helper functions and decorators

1. **`verify_jwt_in_request()`**

Verifies the presence and validity of a JWT in an incoming request.

```python
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, jwt_required


@app.route('/verify')
def verify():

    # manually verify jwt in current request
    verify_jwt_in_request()

    # if this point is reached, jwt is present and valid
    return jsonify({'message': 'JWT is valid'})
```

*friender-BACKEND/app.py*
```python
@app.before_request
def verify_jwt():
    """ Check that a token is valid, if it is provided.
        Token is optional.
    """

    verify_jwt_in_request(locations=['headers', 'cookies'], optional=True)
```

- Before each request we are calling `verify_jwt_in_request`,  passing in two arguments for the parameters `locations` and `optional`.
	- Passing in `True` to the optional `optional` parameter allowed us to verify a token if present in each request, optionally.
	- Meaning an unverified user can still access unprotected routes.

```python
------------------------------------------------------------------------------------------
```

2. **`@jwt_required`**
   
   A decorator that protects a route by requiring a valid JWT in the request headers.
    
```python
from flask_jwt_extended import jwt_required


@app.route('/protected')
@jwt_required
def protected():

# only accessible with valid jwt
 return 'Hello, world!'
```

```python
------------------------------------------------------------------------------------------
```

3. **`create_access_token()`**
   
   Generates a new access token based on a given identity, expiration time, and optional additional claims.

```python
from flask_jwt_extended import create_access_token


# Create an access token for a user with ID=123
access_token = create_access_token(identity=123)
```

***IN THE BACK END - `POST /login` route in the back end, issuing the token:***

*friender-BACKEND/app.py*
```python
@app.post("/login")
def login():

	# authenticate user
    user = User.authenticate(
        request.json.get("username"),
        request.json.get("password")
    )

    # return token with encoded user data
    token = create_access_token(identity=user.id)
    
    return jsonify(token=token)
```