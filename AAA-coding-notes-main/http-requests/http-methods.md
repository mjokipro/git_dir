- GET and POST are “HTTP methods” (also called “HTTP verbs”)
- They’re the most common, by far, but there are others

## GET
- GET: requests without side effects (ie, don’t change server data)
    -   Typically, arguments are passed along in query string
        -   If you know the arguments, you can change the URL
    -   Entering-URL-in-browser, clicking links, and _some_ form submissions

### Sample GET Requests
```html
<a href="/about-us">About Us</a>

<a href="/search?q=lemurs">Search For Lemurs!</a>

<!-- will submit to URL like /search?q=value-in-input -->
<form action="/search" method="GET">
  Search for <input name="q">
  <button type="submit">Search!</button>
</form>
```

## POST
-   POST: requests with side effects (ie, change data on server)
    -   Typically, arguments sent as body of the request (not in query string)
    -   _Some_ form submissions (but never entering-URL-in-browser or links)
    -   Always do this if there’s a side-effect: sending mail, charge credit card, etc
    -   “Are you sure you want to resubmit?”

### Sample POST requests
- POST requests are always form submissions:
	- However, forms are by default GET requests (method default is GET), unless POST (or other) is explicitly specified.
```html
<!-- will submit to URL add-comment, with value in body -->
<form action="add-comment" method="POST">
  <input name="comment">
  <button type="submit">Add</button>
</form>
```

## Command line requests
- OSX systems come with a utility, [[curl#HTTP Requests with curl]], which will make an HTTP request on the command line.