```query
tag:rithmQ
```


## Monday 4/10 questions:

- @ check in monday: when to use 1 query vs 2 queries
- @ examples to break apart route into middleware 
	- middleware in separate file? or same file as route?
- @ different process exit code meanings
- @ Error handler – for JSON or for *custom html/404*?

```query
tag:monday
```



## Return from Break Questions

- @ Could we talk a bit about use cases for the after_request function for routes?

- @ When designing a new project, what factors should we consider when deciding when and what should be done by the front end vs. back end?

- @ What aspects of a codebase or creating a new project might clue us into OOP vs. an alternative like a separate helper functions or utils file? 
	- Functional programming vs OOP
	- @ Are these approaches ever mixed? 

- @ Why in the assessment is the jquery script in the head on the html?

### Warbler Solution

- In `models.py`  I set up a minimum length constraint on the message text using __table_args__ and **CheckConstraint()**, and a @validates decorator.  
	- Is there a better way of doing this? 
	- To apply the same constraint to multiple columns, does each need it’s own **CheckConstraint**?

- How to test before_request functions?

- Note at bottom of app.py with an after_request route: could we talk a bit about what this is used for, and what non-caching headers means? 
	- https://stackoverflow.com/questions/34066804/disabling-caching-in-flask

- When testing the logout invalid routes in insomnia,
	- had trouble authorizing with a valid cookie - printed out value that showed “none”
	- (tried temporarily disabling the csrf permissions in the dev server to test)
	- $ Solved by using local host, logging in, deleting session cookies, then pressing logout button to test



## Testing

- app = flask - what is on an instance of Flask? 
	- test_client(): Could we talk a bit more about what’s happening with the app.test_client() and with app.test_client() as client statement in some of the solution test files?
