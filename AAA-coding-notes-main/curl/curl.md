- curl is used in command lines or scripts to transfer data.
- OSX systems come with a utility, **curl**, which will make an HTTP request on the command line.

## Making a request using Curl
- We do it in the Terminal!

Simplest & most common request/operation made using HTTP is to GET a URL:
```
$ curl 'https://curl.haxx.se'
```

This will return the entire resource from the server.
```
$ curl 'https://api.github.com/users/elie'
```

From the Github API, this returns a JSON response.

### Example request & response
```terminal
$ curl -v http://site.com/some/page.html
* Rebuilt URL to: http://site.com/
*   Trying 123.45.67.89...
* Connected to site.com (123.45.67.89) port 80 (#0)
> GET /some/page.html HTTP/1.1
> User-Agent: curl/7.41.0
> Host: site.com
>
< HTTP/1.1 200 OK
< Date: Mon, 20 Apr 2018 08:28:50 GMT
< Server: Apache/2.4.7 (Ubuntu)
< Vary: Accept-Encoding
< Transfer-Encoding: chunked
< Content-Type: text/html; charset=UTF-8
<

<!doctype html>
<html>
<head>
  <link rel="stylesheet" href="demo.css">
</head>
...
```
- & Note: everything is a string

## Flags with Curl
-   `-d` or `--data` to send information to a server
	- `-d  '{"username":"xyz","password":"xyz"}'`
	  
-   `-X` or `--request` to specify HTTP verb (`-X POST`)
    
-   `-H` or `--header` to specify additional headers
	- `-H "Content-Type: application/json"`
	    
### Example of a larger request
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"xyz","password":"xyz"}' \
  'https://myapplication.com/login'
```

## When to use Curl
-   curl not used very commonly, but good to use if you just want to confirm you are making the request correctly/ using the data.
-   When you are making a simple HTTP(S) request
-   When you don’t have any other option
	- Good backup if [[insomnia]] not working for some reason
-   When you’re doing scripting
-   You will also see it in almost all API documentation for examples