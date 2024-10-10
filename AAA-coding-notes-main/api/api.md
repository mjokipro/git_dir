## What Is An API?
- A set of clearly defined methods of communication between various components.
- An API may be for a web-based system, operating system, database system, computer hardware, or software library. 

## Third Party APIs
- Companies will provide access to their data (sometimes not for free)
	-   Twitter API, give me all tweets that mention “ice cream”
	-   Facebook API, send me the current user’s profile picture
	-   Weather API, what is the weather in Missoula Montana?
	-   Reddit API, what is the current top post?
	-   GooglePlaces API, what gas stations are near the user?
	-   Yelp API, give me 10 restaurants in the zipcode 94110

## Data Formats
-   When we browse on the web, we make HTTP requests and get HTML back.
-   APIs don’t respond with HTML.
    -   HTML contains info about page structure. APIs respond with data, not structure.
-   They use different data formats like XML and JSON.
    -   These are still text based formats—remember, HTTP is text based!
- The term `payload` means data sent 

### XML
- Syntactically similar to HTML, but does not describe presentation like HTML, and many of the tags are custom.
```xml
<person>
  <name>Elie</name>
  <favoriteColor>purple</favoriteColor>
  <city>San Francisco</city>
</person>

```

### JSON
- A JSON payload must be sent as a string over HTTP requests.
- JavaScript objects are converted to JSON string via JSON.stringify();
- JSON string are converted to JavaScript objects via JSON.parse();
- See [[json]] for more info;
- & Most libraries parse JSON for you.

### JSON vs XML
- We’ll primarily use JSON: it’s easier to parse & works great with JavaScript!
- JSON is also the contemporary standard for most modern APIs.

## API Security
- Some APIs require you to have an “API key” or password to use them.
- You’ll need to read their docs to understand how to get those.
- & Many APIs cannot be used via AJAX because of the _same origin policy_.

### AJAX & Same Origin Policy
- By default, you can only get a resource via AJAX if the page making the request is the “same origin” as the API URL.
	- To be “same origin”, it needs the same hostname, protocol, _and_ port.
- & Same Origin Policy is ONLY APPLICABLE to AJAX requests

#### Example:
- From a page served at `https://site.com/users`:
	- !  `https://api.site.com/books`: not same, different hostname
	- !  `http://site.com/api/books`: not same, different protocol
	- !  `https://site.com:5000/api/books`: not same, different port
	- $  `https://site.com/api/books`: same origin
	  
- & When an AJAX request is blocked by the “same origin policy”, the _browser_ refuses to make the request.
- You don’t get things like a 404 error _(those come from the server)_.  
Instead, you get messages like this:
```
Access to fetch at *https://api.twitter.com/* from origin
*https://site.com* has been blocked by CORS policy.
```
If you get any status code (400, 500, etc), the same origin policy didn’t block the AJAX request

#### Some APIs allow themselves to be used by other sites via AJAX:

So, from an AJAX call from [Rithm School’s Website](https://rithmschool.com/), this works:
```
await fetch("https://api.github.com")
```

Other APIs do not:
```
await fetch("https://api.twitter.com")
```
*(That would work if request was made from `https://api.twitter.com`, because that’s the “same origin” as the AJAX call)*

- % NOTE:
	- We will see later in this course how to work around this policy!
		- CORS: Cross Origin Resource Sharing – an API can choose to allow AJAX requests
	- For now, with the APIs we will be working with, if you are seeing errors that mention the Same Origin Policy or something called CORS (Cross Origin Resource Sharing), you most likely have something wrong with your request.

## Reasoning for this security
- When you use AJAX to make requests in the browser, your API key is viewable in your javascript. 
- The Same Origin Policy keeps others from learning your API key and potentially maliciously using it. 
	- Tweeting as you, etc. 
	- This is like Banks preventing you from setting your Card PIN to be 1234
