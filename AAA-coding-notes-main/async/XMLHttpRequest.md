## HTTP (Hypertext Transfer Protocol)
- HTTP is a request response protocol
	- Developer sends a request, goes to server, server issues a response
		- Request - What do we want to do
		- Response - What was actually done
- Example of an XHR (XMLHttpRequest) instance created, open, and sent:
```js
const newPuzzle = (wordCount) => new Promise((resolve, reject) => {
	const request = new XMLHttpRequest();  // Creates instance of request
	
	request.addEventListener("readystatechange", (e) => {
		if (e.target.readyState === 4 && e.target.status === 200) {
			const data = JSON.parse(e.target.responseText);
			resolve(data.puzzle);
		} else if (e.target.readyState === 4) {
			const errorMsg = e.target.status + " " + e.target.statusText;
			reject(errorMsg);
		}
	});

request.open("GET", `https://puzzle.mead.io/puzzle?wordCount=${wordCount}`); // Opens the request - this sets up the HTTP message to be sent
request.send();  // Sends the request/message to the URL passed as the 2nd arg when request was opened

});
```

### Viewing requests in dev tools
- Can view HTTP requests in dev tools under "Network"
	- If you click on those tools, and then click on "response", you can see the response sent by the server to the page
	- Note that ws is websocket that is used by live server
- To get useable data for our purposes (from udemy Andrew modern js class), we will be sending a request that let us get JSON that we can then parse into js object to extract data off of js object

#### XMLHttpRequest.readyState
- An XHR client exists in one of the following states:
0 - Unsent
1 - Opened
2 - Headers_received
3 - Loading
4 - Done
[cite](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState)

#### Status codes
- Denotes status of an XHR / XMLHttpRequest. Typically use ones in 200s, 300s, 400s, 500s
	- 200 - okay, 404 - not found, etc.
- [Link](https://www.webfx.com/web-development/glossary/http-status-codes/) to status codes

## Documentation resources
- MDN Documentation [here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#instance_methods)
- Videos on how web and http request work [here](https://www.youtube.com/watch?v=kBXQZMmiA4s&list=PLzdnOPI1iJNfMRZm5DDxco3UdsFegvuB7&index=5)
- HTTP messages MDN docs [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages)