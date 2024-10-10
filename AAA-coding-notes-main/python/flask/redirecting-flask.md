## Redirecting 

### What is an HTTP redirect?
-   An HTTP response
-   The status code is a “redirect code” (often, 302)
-   It contains a URL for browser to re-request
-   Typically, for ancient browsers, contains HTML with a link
- & Note: TWO requests are made with redirects
	- Original Request (response is redirected)
	- New Request to updated page

### Typical Use Cases

#### Common Pattern 1 : Redirect GET to GET
- TWO requests made
	- 1st - the original request by the browser
		- Server responds and says: “hey, this site isn’t here anymore”, redirect to XYZ site
	- 2nd - the browser makes a BRAND NEW request to XYZ site
		- Server responds with the site HTML (perhaps renders jinja template)

```
$ curl -v http://localhost:5000/redirect-me

< HTTP/1.0 302 FOUND
< Content-Type: text/html; charset=utf-8
< Location: http://localhost:5002/somewhere-else

<h1>Redirecting...</h1>
<p>You should be redirected automatically to target URL:
 <a href="/somewhere-else">/somewhere-else</a>.
 If not click the link.</p>

```

- Your browser won’t typically show you this page —  it makes the re-request so fast you don’t even notice it happened!
![_images/render-vs-redirect.png|500](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/flask-tools/handout/_images/render-vs-redirect.png)


### Common Pattern 2: Redirect POST to GET
-   POST requests are often from a form
    -   and change data on the server
-   If you return HTML from a POST request, the browser shows it fine
    -   But if the user hits “Refresh”, they get weird “ok to resubmit” dialog, and refreshing could submit data 2x
-   Better strategy:
    -   Do the work you want inside your POST route
    -   Then _redirect to_ a page that shows the confirmation
- User browser will then make another GET request 
	- Server responds with the confirmation page/new page HTML
- In summary, the number of requests made the user’s browser this way would be:
	- GET request for original form
	- POST request with form data, server responds with redirect
	- GET request to the redirected URL

demo/app.py
```python
# At top of file, would need: 
# from flask import Flask, redirect, render_template
# (at least)

@app.post("/post-example")
def post_example():
    """An example of good POST handling."""

    isbn = request.form["isbn"]

    if isbn in VALID_ISBNS:
        print(f"\n\nBuying Book: {isbn}\n\n")

        # flash message: we'll talk about this soon
        # flash(f"Book {isbn} bought!")

        return redirect("/thanks")
    else:
        error = "Invalid isbn"
        return render_template("post-form.html", isbn=isbn, error=error)


@app.get("/thanks")
def say_thanks():
    """Thank user for buying a book."""

    return render_template("thanks.html")

```

### Flask Debug Toolbar & Redirects

- The Debug Toolbar makes redirects explicit
- This is very useful for debugging!

If you don’t want this, you can turn it off:
```
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

```
(for when you know your redirects are working and want this to happen automatically)