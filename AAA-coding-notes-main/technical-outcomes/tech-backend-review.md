
---
date: 2023-06-07
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Goals

-   Review the must-knows for backend
-   Review Node/Express
-   Review Python/Flask
-   Review SQL and Databases
-   Make sure you’re ready for interview questions!

## Back-end

-   Node / Python
	- node - 
	- python - backend language, native 
	- Recommendation: be an expert in one of them: node or python
-   File IO
	- might be more of an aspect for take home challenges
	- easier in python - python is meant for handling big data
	- rithm recommends that you pick python for these types of challenges
-   API Design
	- for an api, would be json 
		- (server side rendering is  not quite an api) These server side apps are also called: *Multipage Apps* when you’re really rendering multiple pages from the server
	- Think about the shape of the data
	- Authentication vs authorization
	- validation: JSON schema
		- If you are just validating incoming json data: Json schema much more appropriate tool
		- WTForms like bringing a gun to knife fight for just validating json
	- Document Document Document
		- write good documentation for your routes
		- understanding the shape of the data is #1 thing to communicate
- REST
- GraphQL – [Intro and Tutorial](https://www.digitalocean.com/community/tutorials/an-introduction-to-graphql)
- MVC: Model View Controller
	- system architecture pattern
		- way of designing these backend patterns
	- Model is the container
		- to keep all logic in that place
			- dont’ need to know how a user is created, etc. 
			- allows separation of concern
			- What does this data look like? 
	- Views
		- logic around displaying or giving something back to the user
		- Want it to be as short and simple as possible
		- don’t want any logic inside of it that doesn’t have to do with handling request and issuing response
		- View’s job is to take in a request and issue a response
	- Controller
		- more of a debated topic
		- could be higher level logic of framework
			- what is tying this request that is sent to the route that is defined
		- 


- Most likely: 
	- this is backend app
	- jobly: 1 api , front end robust
	- islands architecture: 
		- let the server render things
		- then have the frontend do things with it


### Security

-   XSS
	- javascript that you didn’t know would run, will run
	- XSS make other problems worse - because if you have any other issues, it compounds them. can bypass CORS, etc. 
-   SQL Injection
	- #interviewQuestions  often something that comes up in interviews 
	- parameterizing the queries
	- risk whenever javascript is running SQL for you
		- ORMs handle this for you
-   CSRF: cross site resource forgery
	- when you submit a form, want to make sure it’s getting submitted to the place you expect
-   Hashing
	- one way transformation - cannot be reversed
	- Want to make sure you only store hashed passwords
	- !! Never store plain text passwords
	- stable: same input will always log to the same output
		- pure function: same input → same output
-   Two way encryption

### Databases

-   SQL
	- practice writing raw SQL
	- window functions, etc. 
	- if you are proficient in sql, you’ll never be strapped for a job
-   Constraints
	- not nullable
	- or can require that “price” is above X amount
	- think about numeric types vs float types
		- is it okay that amounts change slightly, or do you need to keep this amount *exact*
-   Referential Integrity
	- #interviewQuestions 
	- if you have a foreign key, that thing has to exist

## Data Structures + Algorithms

-   Lists
-   Trees
-   Graphs
-   Hash Tables
	- should not have to write one yourself
	- know what it gives you, that it gives you O(1) runtime, appleth index
-   Sorting
	- comparative sort: O(nlogn)
	- bucket sort: O(n)
-   Searching
	- binary search
		- #interviewQuestions Know iteratively and recursively
		- is the array sorted? if so, binary search is an option

- unlikely. to actually deal with these on the job unless you have a very backend job with very large data 

