### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?
  - mainly that js is on client side, manipulates info in view.
  - python is what controller sends to and provides interface for user

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.
  -catching errors or .get()

- What is a unit test?
- tests individual components like functions

- What is an integration test?
- tests larger collections of functionality like unittest in py for views

- What is the role of web application framework, like Flask?
- to provide backend development environment

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?
  -this would be more suited for a query string, since it isnt trying to access resource

- How do you collect data from a URL placeholder parameter using Flask?
- must include url param as arg in view function; name=USERS[username]

- How do you collect data from the query string using Flask?
- color = request.args.get('color'), request.args['term']

- How do you collect data from the body of the request using Flask?
- request.form.get('term'), request.form['term'], request.get_data() = raw data

- What is a cookie and what kinds of things are they commonly used for?
- key / value pairs used for keeping track of various things like times visited

- What is the session object in Flask?
- provides better, larger way to store info on client side using cookies

- What does Flask's `jsonify()` do?
- converts output of function to JSON response object
