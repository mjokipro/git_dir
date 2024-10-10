## Getting Axios
- Can easily add using CDN link:
```html
<script src="https://unpkg.com/axios/dist/axios.js"></script>
```
- & Make sure this script tag is above your actual JS file

## GET requests with Axios
- Make a GET request to a URL:
	- `axios.get(url, ?config)`
- Returns a promise
- config is an optional object many Axios methods use
	- It holds specific configuration for what you need.
	- config option also called `url quoting`
	- Saves you trouble particularly when trying to use User-typed queries
		- Don’t need to worry about spaces or other `&` characters that you would if you added these directly into the url as a part of the query

### Config example:
To make request for _/resource?a=1&b=2_, can either use:
```js
axios.get("/resource?a=1&b=2")
```
or:
```js
axios.get("/resource", {params: {a: 1, b: 2}})
```
Second form is better: you don’t have to worry about how to “url safe quote” characters that aren’t normally legal in URLs.
- & Note: to add query items, must add this data as an object to the key `params` on the config object. There are other keys for the config object, but `params` is most often used b/c of its function for querying.
	- & `{params {queryKey: queryValue, queryKey: queryValue, etc.}`
- All data for GET requests must be sent through the URL – axios just builds the URL for us using this data we pass to the config object. 

### GET Example:
```html
<h2>Simple GET Request</h2>

<button class="btn btn-primary"
        id="card-btn"> Get Card </button>

<div id="card" class="box"></div>

<script src="/static/card.js"></script>
```

```js
/* show result directly in card box */

async function getCard() {
  let response = await axios.get(
    "/api/card");

  console.log("getCard resp=", response);
  $("#card").html(response.data);
}

$("#card-btn").on("click", getCard);
```

## POST Requests with Axios
- Similar to axios.get, but uses a POST request
	- `axios.post(url, ?data, ?config)`
	- `axios.post(url, {a: 1, b: 2})`
- This is passed as JSON to server.
- % Note:
	- It’s rare to send config data with a post request, because whatever data you are sending, you are likely sending within the data argument.

### POST Example:
```html
<h2>Simple POST Request</h2>

<input id="amount" placeholder="Amount" />
<button class="btn btn-warning"
        id="borrow-btn"> Borrow </button>

<div id="borrowed" class="box"></div>

<script src="/static/borrow.js"></script>
```

```js
/* show result of borrowing in box */

function showBorrow(res) {
  $("#borrowed").html(res);
}

async function borrowMoney() {
  let amount = Number($("#amount").val());

  let response = await axios.post(
    "/api/borrow", { amount }); 
	// Note the post request made above. {amount} is data, NOT ?config

  console.log("borrow resp=", response);
  showBorrow(response.data)
}

$("#borrow-btn").on("click", borrowMoney);
```

### Form encoded POST requests
- By default, Axios sends POST data as JSON. This is what almost all modern APIs expect.
- When web browsers submit POST forms in the traditional way (ie, not using AJAX), they don’t send this data in JSON — they send it in an older format, “form-encoded”.
- It’s not common that you’d want Axios to send POST data this way. But you may be working with older APIs that expect data in this format, or you may want to work on switching over an older, non-AJAX application to an AJAX one, and find it helpful for the server to receive traditional form-encoded data. For an example of how to do so, see [https://www.npmjs.com/package/axios#browser](https://www.npmjs.com/package/axios#browser)

## Generic axios function syntax

```js
axios({ method: 'put', url: 'https://example.com/api/resource', data: { name: 'John Doe', age: 30 } });
```

## Axios Documentation
- By default, Axios recognizes JSON response & turns into JS object
- https://www.npmjs.com/package/axios


