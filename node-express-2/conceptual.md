### Conceptual Exercise

Answer the following questions below:

- What is a JWT?
  A json web token is a method of authentication that involves a set of properties, along with a secret key.  It is signed by the server and attached to the header response that is returned.  Can only be deccrypted by the server that holds the secret key.

- What is the signature portion of the JWT?  What does it do?
  The signature portion is made up from a secret key.  It helps to make sure the payload has not been tampered with, and that the sender is authentic.

- If a JWT is intercepted, can the attacker see what's inside the payload?
  yes.  The payload can be seen by anyone, so it is advised not to place sensitive information here.

- How can you implement authentication with a JWT?  Describe how it works at a high level.
  A user signs into a service, the server compares their credentials.  If it passes, then the server returns a signed token, with predetermined payload.  This token is then attached on each request going forward to allow access to routes in the server.

- Compare and contrast unit, integration and end-to-end tests.
  Unit tests are for testing functionality of small parts.  Integration tests test the moving parts of routes or class interactions.  End-to-End tests test the entire application from a user perspective.

- What is a mock? What are some things you would mock?
  creating objects that simulate the behaviour/s of a real object in the world.
  Functions that are dependencies, database updates, etc.

- What is continuous integration?
  Deploying small increments of a larger codebase, that then have to pass automated testing before being put to production.  A branch feature is pushed, and then the CI environment runs it through tests, if it passes them, the merge is accepted barring any other code reviews.  If it fails, it is returned.

- What is an environment variable and what are they used for?
  Environment variables are local machine set variables that only the application can read.  They are used to keep things like IDS, SECRET_KEYS, API KEYS private to avoid being compromised.

- What is TDD? What are some benefits and drawbacks?
  Test driven development is the practice of making the tests first in a project.  Then you work to make each tests pass, and then iterate the business logic on top of that.  It ensures your code works as is intended, since you base it off the test.  It can take more time, and not allow room for growth in the applicatino without having to rewrite a large portion of the tests.

- What is the value of using JSONSchema for validation?
  JSONSchema helps us validate incoming data that might not be from a form.  It helps to make sure no bad data, malicious data, or incomplete data is sent on a request that we might not be able to check on the client-side.

- What are some ways to decide which code to test?
  Any code that creates side-effects, or has a key role in data manipulation.

- What are some differences between Web Sockets and HTTP?
  Web sockets keep the connection open between the server and the client, allowing for continous communication. HTTP is a handshake, in which a client passes information, the server then acknolowdges it, and either denys/accepts it.  The server then responds, and the client receives it.  No connection is kept open.

- Did you prefer using Flask over Express? Why or why not (there is no right 
  answer here --- we want to see how you think about technology)?
  I enjoyed flask's simplicity.  Flask is simple to set up and run right away.  However, for more complex applications, I'd use Express, due to its robust features, and intrinsic modularity in router, middleware, and application structure.