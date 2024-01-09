## Goals

-   Review GET vs POST
-   Review other HTTP verbs (PUT, PATCH, DELETE)
-   Describe what REST is
-   Build and Test JSON APIs

## Reviewing HTTP verbs

### GET and POST

- GET and POST are the only two that the *browser itself makes*.
	- % Note: you can have forms that send GET requests, they’re just purely about getting info and don’t “change the world”

- GET
	-   Remains in history, *can be cached/bookmarked*
	-   *Data sent in URL, in query string*
		- No body for GET request, only place to send data is in query string
	-   Repeatable

- POST
	-   Doesn’t remain in history, is *not cached/bookmarked*
	-   *Data sent in body of the request*
	-   Not repeatable
		- Each considered to be unique

- When to use GET or POST?
	-   Searching / Filtering? GET
	-   Sending an email? POST
	-   Updating a user? POST ?

### PUT / PATCH / DELETE

- These don’t happen *inside the browser directly*
	- Thus, these aren’t available to HTML forms to submit directly. When making your own APIs or your own AJAX calls to **REST**ful APIs on the front end, then these methods become available. 

- **PUT**
	- Update *entire* resource
	- “This is everything I want you to know about a resource” (means anything not included gets set to null)
- **PATCH**
	- Update _part of_ resource *(patch it up)*
	- “Here is some info, only change these things”
- **DELETE**
	- Delete resource

- % Note: there is another method **OPTION**
	- This method is very internal to the browser-server communication with “preflight” conversations.
	- Before sending the real question, sends a message to say “I’ll check and see if you’re up for answering?” etc.

### Requesting with methods

![[rest-json-apis-1679321832043.jpeg]]

## Safety-&-idempotence

- A **safe** operation is one that does not change the data requested.
- An **idempotent** operation can be performed many times (with same data) with the *result of all calls being the same*, as if it was done once.
	-   Idempotence refers to side-effects, not all-effects or responses.
	-   Example: In math, calculating absolute value

### Which methods are safe / idempotent?

![[rest-json-apis-1679321933660.jpeg]]
- Theoretically, a GET request can be programmed to change things, but well understood and accepted that it shouldn’t

### Why do we care about this?

-   Better describe the routes that we create
-   Build standards around how we define routes
-   Core part of the REST standard!

## Introduction to REST

- **REST** is a widely used set of conventions, not an official standard, but a widely used community guide on:
	- Sensible URLS
	- Sensible methods
	- So you don’t have to make this up each time you create an API
- These notes cover mostly the first 2, there are more.
- **REST** itself is about *data* returning routes, *not* about *html* returning routes
- Some times you may not use REST:
	- If using GraphQL and returning SQL like data, may opt for newer standard.
	- If some company you’re working with didn’t know about when things were created, and needing to continue their alternative way to be compatible with their past codebase.

### Imagine you’re a developer

-   Hopefully this should not be imagination!
-   Your task: create route for an API that will update a user!
    -   POST /users/update ?
    -   POST /users/change ?
    -   PATCH /users/\[id\] ?
-   With this much flexibility, it’s very helpful to standardize!

### REST

-   Architectural style defining constraints for creating web services
    -   Includes things like: client-server model, statelessness, and caching
-   APIs that adhere to these constraints are called _RESTful APIs_

### RESTful APIs

-   Usually have base url
    -   eg `http://api.site.com/` or `http://site.com/api/`
-   Have a _resource_ after the base url
    -   e.g. `http://api.com/books` or `http://site.com/api/books`
-   Use standard HTTP verbs (*GET*, *POST*, *PUT*/*PATCH,* *DELETE*)
-   Structure routes in a standardized way *(RESTful routing)*

### Resource

-   **Resource**: An object with type, associated data, relationships to other resources
	- In OOP, every idea has a class, in REST, call this a **Resource**
-   A set of methods that operate on it
-   Analogous to instance/methods in OO
    -   HTTP verbs describe methods on resource
    -   DELETE /cats/fluffy is same idea as fluffy.delete()
- & Not every route in a RESTful API will necessary be around resources.
	-  For example, you may have routes to initially authenticate with the API that aren’t using a resource in the URL.

### RESTful routes

- RESTful routes for a resource called _snacks_:
![[rest-json-apis-1679323071081.jpeg]]
- Route `/snacks` = resource   - It is pluralized
	- Contains overview data, has data on all the snacks
- Route `/snacks/[id]` 
	- Contains data on 1 snack, includes all data, more detailed than overview data (e.g. calories, etc.)

#### Creating new instance of a resource

- *Two* common options for creating a new instance of a resource:
	- Route `/snacks` **POST**  
		- & Better for when you *don’t* know the id 
			- (e.g. like a customer likely has serialized ID, since first/last names may not be unique)
			  ``` python
			# When you don't know the id e.g. customer, etc.
			# (first name/last name may be the same, so having serial id better)
			# Within models.py:
			class Snack:
				id = serial
				name = "Twizzlers"
				calories = 200
				company_id
				  
			# Within app.py:
			  # create
			  POST / snacks
			  name=Twizziles
			  calories=100
			  {id:47, name:'Twizzlers', ...}
			  
			  PUT/snacks/47
			  name = Twizzlers
			  ...
			  
			  PATCH/snacks/47
			  
			  calories = 200
			  
			  DELETE/snacks/47
			```
	- Route `/snacks/[id]` **PUT**  (also an option: `/snacks/[id]` **POST** )
		- & Better for when you *do* know the id
			- Like when the id is the snack name (e.g. `snacks/twizzlers` PUT) 
			- Advantage of PUT is that you can’t accidentally end up with the same item in your list 2x (because PUT is *idempotent*)
			  ```python
			# When you know the id e.g. id is the name of the snack, etc.
			# Within models.py:
			class Snack:
				id = str, like 'twizzlers'
				name
				calories
				company_id
				
			# Within app.py:
			# create
			POST/snacks
			# OR
			PUT /snacks/twizzlers
			
			{id:47, name:'Twizzlers', ...}
			
			PUT/snacks/twizzlers
			name = Twizzlers
			...
			
			PATCH/snacks/twizzlers
			calories = 200
			
			DELETE/snacks/twizzlers
```

```python

```

### RESTful route responses

- Not entirely standardized — but these are common:
- **GET** /snacks
	- Returns 200 OK, with JSON describing snacks
- **GET** /snacks/_\[id\]_
	- Returns 200 OK, with JSON describing single snack
- **POST** /snacks
	- Returns 201 CREATED, with JSON describing new snack
- **PUT** or **PATCH** /snacks/_\[id\]_
	- Returns 200 OK, with JSON describing updated snack
- **DELETE**
	- Returns 200 OK, with JSON describing success

![[rest-json-apis-1679323324233.jpeg]]

- Examples of RESTful routing:
	-   [Stripe](https://stripe.com/docs/api?lang=curl#charges)
	-   [Github](https://developer.github.com/v3/repos/)
	-   [Yelp](https://www.yelp.com/developers/documentation/v3/event)
	-   [Spotify](https://developer.spotify.com/documentation/web-api/reference/playlists/)

### Nested routes

- Imagine a site like YELP
	- Business and Reviews have a 1:M relationship - one business can have many reviews
- Example of how urls will be structured with REST:
![[rest-json-apis-1679324019563.jpeg]]

![[rest-json-apis-1679324053014.jpeg]]

## RESTful APIs with Flask

- &  Will respond with JSON, not HTML (*Data* returning routes, not HTML)
    -   Won’t typically use Jinja to make JSON, just jsonify in route
    -   Can’t redirect — return JSON of answer (redirection really a concern of HTML returning routes, data returning routes almost never redirect)
-  Can still use Flask and Flask-SQLAlchemy

### Flask jsonify

- `jsonify(thing)`
	- Returns JSON of thing (usually dict, but could be list)
- `jsonify(name="Jane", age=21)`
	- Returns JSON like `{"name": "Jane", "age": 21}`

- JSON can only represent dictionaries, lists, and primitive types
    -   Cannot represent things like SQLAlchemy model instances
    - & `jsonify()` does *not* preserve order
- % Note that `json.dumps()` in python will convert subset of python objects into a json string, but will *not* add the JSON header. `jsonify()` both converts to json string *and* add the header for JSON data.
-   Python can’t just “turn your objects into JSON”
    -   Requires a process called _serialization_

### Serialization

- **Serialization**: Taking data that is complex that is interesting and putting it in straightforward, piece by piece format
- You can turn your instances into dictionaries or lists by:
- Adding serialize method to your model to turn instance into a regular dictionary:
	- example of encapsulation: bringing this serialization function onto your model - keeps things together nicely
demo/models.py
```python
class Dessert(db.Model): ...
    def serialize(self):
        """Serialize to dictionary."""

        return {
            "id": self.id,
            "name": self.name,
            "calories": self.calories,
        }
```

- Then querying desired data & calling your serialize method

- Example with querying *all* of an item:
demo/app.py
```python
@app.get("/desserts")
def list_all_desserts():
    """Return JSON {'desserts': [{id, name, calories}, ...]}"""

    desserts = Dessert.query.all()
    serialized = [d.serialize() for d in desserts]  # creates list of dictionaries 
    #                                               (each a dictionary of a dessert)

    return jsonify(desserts=serialized)
```

- Example with querying *one*:
demo/app.py
```python
@app.get("/desserts/<dessert_id>")
def list_single_dessert(dessert_id):
    """Return JSON {'dessert': {id, name, calories}}"""

    dessert = Dessert.query.get_or_404(dessert_id)
    serialized = dessert.serialize()

    return jsonify(dessert=serialized)
```

### Sending data to a Flask JSON API

-   For Insomnia, choose JSON as the request type.
-   For cURL, set the _Content-Type_ header:
    ```shell
    $ curl localhost:5000/api/desserts \
    >    -H "Content-Type: application/json" \
    >    -d '{"name":"chocolate bar","calories": 200}'
    ```
    _(Makes a POST to /api/desserts, passing in that JSON data)_
-   For AJAX using Axios, sending JSON is the default

### Receiving data in a Flask JSON API

- If  request is made with *Content-Type: application/json* (If your flask route is passed JSON)
	-   it won’t be in request.args or request.form
	- &  will be inside of request.json!

demo/app.py
```python

HTTP_CREATED_STATUS = 201

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

	# Can also return this for clarity for yourself later:
	# return (jsonify(dessert=serialized), HTTP_CREATED_STATUS)
```
- When a route returns a tuple:
	- <u>First item:</u> Data you want to hand back
	- <u>Second item:</u> Response Status code
- In the case above, 201 is a more specific status code for when a instance of a resource has been created.
- #tip Show example input/output in docstring. Doing so within these view functions are great times to do so.

## Testing our API

- &  We will be testing the JSON response, not HTML
    -   Send data via a *json argument*(not data)
    -   Look at *response.json*, not response.data
-   This makes things even easier! We’re just testing data, not presentation
-   Can experiment before/while writing tests with Insomnia or curl

![[rest-json-apis-1679325135748.jpeg]]
- Comparing the above two tests:
	- Left test: tests the *whole* response
	- Right test: 'nibbling' test
		- What if your response was returning a list of 10 desserts instead of the expected 1? This test wouldn’t catch that.
		- What if your response was returning additional info, like a secret recipe? This nibbling test also wouldn’t catch that
	- & Better to test the *whole* response to see that you are getting the things - and only the things you *expect*

demo/tests.py
```python nums {4-6, 13, 16}
def test_create_dessert(self):
    with app.test_client() as client:
        resp = client.post(
            "/desserts", json={          # Note: sending json = {}
                "name": "TestCake2",
                "calories": 20,
            })

        self.assertEqual(resp.status_code, 201)
        self.assertIsInstance(resp.json['dessert']['id'], int) # checks that id is int

        # don't know what ID it will be, so pull out of resp and use in test
        id = resp.json['dessert']['id']
        self.assertEqual(
            resp.json,
            {"dessert": {'id': id, 'name': 'TestCake2', 'calories': 20}})

        self.assertEqual(Dessert.query.count(), 2)  # Checking that there are 2 desserts (one created in setup, newest one created in route)
```

- @ Tip: Making a copy of resp.json()
- Another way to test this would be by simply removing the id from resp.json. *However, Flask can not mutate resp.json* so if we want to remove things from it, *we first need to make a copy*:
demo/tests.py
```python nums {12-13, 15-17}
def test_create_dessert_with_delete(self):
    with app.test_client() as client:
        resp = client.post(
            "/desserts", json={
                "name": "TestCake2",
                "calories": 20,
            })
        self.assertEqual(resp.status_code, 201)

        # don't know what ID it will be, so test then remove
        self.assertIsInstance(resp.json['dessert']['id'], int)
        data = resp.json.copy()
        del data['dessert']['id']

        self.assertEqual(
            data,
            {"dessert": {'name': 'TestCake2', 'calories': 20}})

        self.assertEqual(Dessert.query.count(), 2)
```
- Creating a dessert, you don’t know the key and could only compare it to itself (the number you index for on line 11), so you can only make sure the rest of the new data gets added as expected.
- Updating/Patching a dessert, want to test the key because you can compare it to the key that likely gets passed to the view function from the url.

## Wrap up

-   RESTful APIs have standards around routes & methods
-   These are used for _API_ applications, not HTML-returning applications
-   Great resources for reviewing and learning more:
    -   [7 Rules for REST API URL Design](https://blog.restcase.com/7-rules-for-rest-api-uri-design/)
    -   [Awesome Reference Card](https://blog.octo.com/wp-content/uploads/2014/12/OCTO-Refcard_API_Design_EN_3.0.pdf)
    -   [Interesting points about dashes vs underscores in URLs](https://writing.fletom.com/dashes_vs_underscores_in_URLs)