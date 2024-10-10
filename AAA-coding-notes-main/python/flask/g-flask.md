
## What is g

- g is an object available in flask that functions like a ‘scratchspace’
- Values placed on g are temporary - lasting only as long as your current request is in place.  
	- This starts from any *before_request* view functions, through the current request view function and lasts through the loading of the HTML page.
	- This means values on g can be set in the *before_request*and used in the view function and in any *templates*.
	- Values on g won’t work between routes (except before_request → current request)

## Comparing g to session

- Session is an abstraction, that gives us this ‘magic dictionary’ to place data on.
	- Session data is actually stored as a cookie on a client’s browser.
		- So there is a limit to the amount and type of information that can be stored on a session
			- Can’t keep instances on a session - the complexity gets stripped away as the data becomes stringified.
			- Can only keep a certain amount of information - cookies have storage limits
- g can keep instances and larger amounts of data, but keeps them for a shorter time.

