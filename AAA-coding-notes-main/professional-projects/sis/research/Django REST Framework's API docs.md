
Three ways to interact with the API in your browser:

1.  **DRF API documentation website**: http://r00:8000/api/-docs/
2.  **DRF Browsable API**: http://r00:8000/api/
3.  **Admin page**: http://r00:8000/admin/

The API docs are cohort-specific.  
They show only things related to the cohort specified in the URL.

For non-admin users, it shows only public information.  
For admin users, it shows private and public information.

This feature can be enabled/disabled in your project's `settings.py` + `urls.py`.

___

#### High-level overview of routes

*They're predictable.*

For each resource, GET and POST methods are available at the endpoint:
`/api/RESOURCES/`

GET, PUT, and PATCH methods are available at the endpoint:
`/api/RESOURCES/{id}`

##### Routes list

###### /api/assessmentsessions/

GET
POST

###### /api/assessmentsessions/{id}/

GET
PUT
PATCH

###### /api/assets/

GET
POST

###### /api/assets/{id}/

GET
PUT
PATCH

###### /api/cohorts/

GET
POST

###### /api/cohorts/{id}/

GET
PUT
PATCH

###### /api/events/

GET
POST

###### /api/events/{id}

GET
PUT
PATCH

###### /api/exercisesessions/

GET
POST

###### /api/exercisesessions/{id}/

GET
PUT
PATCH

###### /api/lecturesessions/

GET
POST

###### /api/lecturesessions/{id}/

GET
PUT
PATCH

###### /api/projectsessions/

GET
POST

###### /api/projectsessions/{id}

GET
PUT
PATCH

###### /api/staff/

GET
POST

###### /api/staff/{username}/

GET
PUT
PATCH

###### /api/students/

GET
POST

###### /api/students/{id}/

GET
PUT
PATCH

###### /api/submissions/

GET
POST

###### /api/submissions/{id}/

GET
PUT
PATCH

###### /api/resourcesessions/

GET
POST

###### /api/resourcesessions/{id}/

GET
PUT
PATCH

###### /api/token/

POST

###### /api/assets/upload/

POST

###### /api/applicants/

POST

###### /api/bootcampapplicants/

POST

---

#### Browser demo: DRF API documentation website

**Use your web browser to explore/interact with API using the *API documentation website*:**
**[r00:8000/api/-docs/](http://r00:8000/api/-docs/)**

##### About

- Provided by the Django REST framework library.
- A user-friendly interface for exploring the available endpoints, view request/response examples, and understand the expected input/output for each API resource.
	- Includes information about the supported HTTP methods, required parameters, optional parameters, authentication requirements, and more.
- Generated using a tool called "Django Rest Swagger" or `drf-yasg`.
	- Automatically generate an interactive API documentation website based on current API endpoints, serializers, and viewsets defined in your Django project.
- 
- Simplifies the process of documenting your API.
- Ensures that the documentation is up-to-date.
- Works with Django's authentication and permission systems, allowing you to log in with appropriate credentials and perform actions based on your permissions.

##### Demo: GET /api/students

> API for `students.Enrollment` and `students.Student`.
> An enrollment is an instance of a student taking a course.

Here, you can make a GET request to **view student data in the browser**:

###### Parameters

**Page query parameter.**
- Pass in a page number within the *paginated result set*.
- An integer value that indicates the specific page of the result set that the user wants to retrieve.
- Refers to the division of a large collection of data into smaller, manageable portions or *pages*. 

**Search query parameter**
- Include a string search term in your request.
  
###### Responses

An example response from the server:

**Status code**:
`200`

**Description**:
- Media type: `application/json`
- Example value:

```json
{
  "count": 123,
  "next": "http://api.example.org/accounts/?page=4",
  "previous": "http://api.example.org/accounts/?page=2",
  "results": [
    {
      "full_name": "string",
      "status": "accepted",
      "api_url": "string"
    }
  ]
}
```

- Schema:

![[Pasted image 20230510165128.png]]

> ----- "Try it out" ----->
> 
> ----- "Execute" ------>

Let's tour the results.

###### Responses

**Curl**
An example of how to make a GET request to the specified API endpoint using the curl command-line tool.

```
curl -X 'GET' \
  'http://r00:8000/api/students/' \
  -H 'accept: application/json' \
  -H 'X-CSRFToken: SA6kFY676vozGsGaYmO6oVyQooOyI5UEyeXgofuDP1sK9YcUdIVGNEs0QhBftwq9'
```

**Request URL**
The URL endpoint to which the HTTP request should be made.

```
http://r00:8000/api/students/
```

**Server response**
Status code: `200`
Response body: 

```json
{
  "count": 2,
  "next": null,
  "previous": null,
  "results": [
    {
      "full_name": "student 1",
      "status": "accepted",
      "api_url": "http://r00:8000/api/students/1/"
    },
    {
      "full_name": "student 1",
      "status": "accepted",
      "api_url": "http://r00:8000/api/students/2/"
    }
  ]
```

Response headers:

```
allow: GET,POST,HEAD,OPTIONS 
content-length: 231 
content-type: application/json 
cross-origin-opener-policy: same-origin 
date: Wed,10 May 2023 19:53:13 GMT 
referrer-policy: same-origin 
server: WSGIServer/0.2 CPython/3.10.6 
server-timing: TimerPanel_utime;dur=15.708999999986872;desc="User CPU time",TimerPanel_stime;dur=2.194000000002916;desc="System CPU time",TimerPanel_total;dur=17.902999999989788;desc="Total CPU time",TimerPanel_total_time;dur=24.945497512817383;desc="Elapsed time",SQLPanel_sql_time;dur=6.286859512329102;desc="SQL 4 queries",CachePanel_total_time;dur=4.948616027832031;desc="Cache 1 Calls" 
vary: Accept,Cookie 
x-content-type-options: nosniff 
x-frame-options: DENY 
```

##### Demo: POST /api/students

###### Parameters

*No Parameters*

Request body:

```json
{
  "student": "string",
  "cohort": "string",
  "adviser": "string",
  "projectsession": "string",
  "status": "accepted"
}
```

Can select the content type in the dropdown menu.

###### Responses

**Status code**
`201`

**Description**
Media type:
`application-json`

Example value:

```json
{
  "student": "string",
  "user": {
    "username": "string",
    "first_name": "string",
    "last_name": "string",
    "pronunciation": "string",
    "nickname": "string",
    "formal_name": "string",
    "pronoun": "string",
    "bio": "string",
    "photo": "string",
    "location": "string"
  },
  "cohort": "string",
  "adviser": "string",
  "projectsession": "string",
  "status": "accepted",
  "api_url": "string"
}
```

Schema:

![[Pasted image 20230510170356.png]]

###### Create a student

> ----- "Try it out" ----->

Fill in request body data

> ----- "Execute" ------>

Responses shown below, with details about the newly created `Student`.

##### Demo: POST /api/students

###### Create a staff member

> ----- "Try it out" ----->

Fill in request body data.

> ----- "Execute" ------>

Switching request body content-type to `multipart/form-data` allows you to enter values through a form.
- Labels required fields.

> ----- "Execute" ------>

---

#### Browser demo: DRF Browsable API

**Use your web browser to explore/interact with API using the *Browsable API*:**
**[r00:8000/api/](http://r00:8000/api/)**

##### About

- Provided by the Django REST framework library.
- A browsable interface that allows developers to navigate through the available endpoints and interact with them in the browser. 
- The documentation for each API endpoint can be provided simply by visiting the URL in your browser.
- Supports various HTTP methods - choose desired method and submit request directly from the browser.
- Displays the response received from the API. Can be viewed in JSON or HTML.
4. displays information about each field, such as its name, type, description, and any validation rules associated with it.

##### Demo: http://r00:8000/api/cohorts/

###### Cohort List

> API For `courses.Cohort`.
> The API is oriented around the cohort being visited, so this only ever returns that cohort, even though there are others in the database.

`GET /api/cohorts/?format=api`
- Represents the HTTP request made to the `/api/cohorts/` endpoint.
`HTTP 200 OK`
- The HTTP response status code is `200 OK`.
`Allow: GET, POST, HEAD, OPTIONS`
- Allowed HTTP methods for the `/api/cohorts/` endpoint.
`Content-Type: application/json`
- Specifies the content type of the response body.
`Vary: Accept`
- Suggests that the server can provide different representations of the response (eg., JSON, XML) based on the client's specified preference in the `Accept` header.

###### Options

Information about an API endpoint's allowed methods, requirements, supported content types, and other details.

###### Create a Cohort

Two ways to submit a POST request:

1. HTML form
2. Raw data

> ----- "POST" form ----->

