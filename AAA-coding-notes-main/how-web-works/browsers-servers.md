## Request and Response
- When you point your browser to a webpage on a server, your browser makes a request to that server.

This is almost always a GET request and it contains the exact URL you want.
![[browsers-servers-1677595240124.jpeg]]
The server then responds with the exact HTML text for that page:
![[browsers-servers-1677595281915.jpeg]]

It’s often the case, though, that the web server itself will have to do some work to get the page you want, often interacting with other things, such as database servers.
![[browsers-servers-1677595334164.jpeg]]

And then it can give back the response you want:
![[browsers-servers-1677595420355.jpeg]]

### What’s in a Request?
-   Method (eg GET)
-   HTTP protocol version (almost always `1.1`)
-   Resource URL you want
-   Headers
    -   Hostname you’re asking about
    -   Date your browser thinks it is
    -   Language your browser wants information in
    -   Any cookies that server has sent
    -   And more!

### What’s in a Response?
-   HTTP protocol version (almost always `1.1`)
-   Response Status Code (200, 404, etc)
	- 200 - OK
	- 301 - What you requested is elsewhere
	- 404 - not found
	- 500 - server had internal problem
	- [More status codes](https://www.webfx.com/web-development/glossary/http-status-codes/)
-   Headers
    -   Content Type (typically `text/html` for web pages)
    -   Date/time the server thinks it is
    -   Any cookies server wants to set
    -   Any caching information
    -   And more!

### Watch a Request/Response
![[browsers-servers-1677595552599.jpeg]]

## Try this out
- You can install a program called **nc**, which will allow you to interact with other computers over the IP network in a raw fashion. This can be useful to get some hands-on feeling about the web protocols.

Here, this shows an interactive session:
![[browsers-servers-1677595830097.jpeg]]

