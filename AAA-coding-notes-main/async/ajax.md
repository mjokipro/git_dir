- AJAX is a technique in Javascript for sending requests and receiving responses from a server _without_ having to reload the browser page.
- & If <u>Javascript</u> is talking to a server in the <u>browser</u>, it’s AJAX

## AJAX Main Takeaways:
- & Async functions always return a promise
- & If you want access to that data, you need to `await` it
- & `await` only works inside of an async function, so you need another async function
- & … this continues until…
- & You have a ‘controller’ function, or at least a different async function  who’s return value doesn’t matter (since you don’t need to `await` the results, it breaks the chain) 

## Traditional Requests
Traditional browser requests happen in response to:
-   Entering a URL in the browser bar
-   Clicking on a link
-   Submitting a form

In all cases:
-   Browser makes request
-   Receives response
-   Replaces _entire resource_ with result

```html
  <!-- EXAMPLE 1: SIMPLE GET REQUEST -->

  <h2>Simple GET Request</h2>

  <a href="/card" class="btn btn-primary">Get Card</a>

  <!-- EXAMPLE 2: SIMPLE POST REQUEST -->

  <h2>Simple POST Request</h2>

  <form action="/borrow" method="POST">
    <input name="amount" placeholder="Amount" />
    <button class="btn btn-warning">Borrow</button>
  </form>
```

![[ajax-1677600497122.jpeg]]

## Ajax Requests
AJAX web request:
-   Made from JavaScript in browser
-   JavaScript makes request (GET, POST, or other)
-   You receive a response
-   Do whatever you want with result!

AJAX is a technique in Javascript for sending requests and receiving responses from a server _without_ having to reload the browser page.
- % Note: What does AJAX stand for?
	- AJAX originally was an acronym for “Asynchronous Javascript and XML”. However many people don’t send XML over AJAX nowadays; it’s more common to send HTML or JSON. The technology is still the same, though, even if the data payload is commonly different. Ultimately, AJAX is a cooler sounding acronym than AJAJ or AJAH.

### Why use AJAX?
-   Don’t need to reload entire page if just 1 thing is changing
-   Interactive web sites
-   Fewer full page loads from server
    -   Your JS can talk to other servers directly
-   Less info has to go across network

### AJAX with Axios
- You don’t _have_ to use Axios for this
	-   There is an old, clunky built-in tool: _(XMLHttpRequest)_
	-   Or a newer-but-still-clunky built-in tool: _(fetch)_
	-   Or lots of other libraries (including _jQuery_)
	    … but we’ll use axios for now! It’s featureful & popular

