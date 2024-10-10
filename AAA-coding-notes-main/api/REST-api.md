
---
date: 2023-05-13
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

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
	- Route `/snacks/[id]` **PUT**  (also an option: `/snacks/[id]` **POST** )
		- & Better for when you *do* know the id
			- Like when the id is the snack name (e.g. `snacks/twizzlers` PUT) 
			- Advantage of PUT is that you can’t accidentally end up with the same item in your list 2x (because PUT is *idempotent*)


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
