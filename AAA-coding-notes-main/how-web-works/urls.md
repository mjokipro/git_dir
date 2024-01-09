## URLs
http://site.com/some/page.html?x=1

turns into:
![[how-web-works-1677593880810.jpeg]]

### Protocols
- “Protocols” are the conventions and ways of one thing talking to another.
	- Like how you talk to your mom is different than how you talk to your boss, etc.
![[how-web-works-1677594046616.jpeg]]

#### http
- Hypertext Transfer Protocol (standard web) (How browsers and servers communicate)

#### https
- HTTP Secure (How browsers and servers communicate with encryption)
- https is the same thing as http with a shell aroung it encrypting its information.

#### ftp
- File transfer protocol (An older protocol for sending files over internet)

- & There are many others, but the ones above are common ones. Other examples:
	- Sending email
	- Streaming video

### Hostnames
- Names for just us humans. The Hostname is the easier-to-remember name, that later gets converted by DNS to be the IP address of where that info lives on a server. 
![[how-web-works-1677594130024.jpeg]]
- DNS (domain name service) turns this into an IP address.
- So site.com might resolve to `123.45.67.89`
- We often talk to servers by “hostname” — site.com or computer-a.site.com.
- That’s just a nickname for the server, though — and the same server can have many hostnames.
- #questions Are Domain name and Host name the same thing? 

### Port
![[how-web-works-1677594168333.jpeg]]
-   Every server has 65,535 unique “ports” you can talk to (2^16 ports)
-   Services tend to have a [default port](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)
    -   For HTTP, is port 80
    -   For HTTPS, is port 443
    -   You don’t have to specify in URL unless you want a different port
        -   To do: `http://site.com:12345/some/page.html`

### Resource
![[how-web-works-1677594227975.jpeg]]
This always talks to some “web server” program on the server
-   For some servers, may just have them read an actual file on disk: /some/page.html
-   For many servers, “dynamically generates” a page

### Query String
- To send some additional information
![[how-web-works-1677594374553.jpeg]]
-   This provides “extra information” — search terms, info from forms, etc
    -   The server is provided this info; might use to change page
    -   Sometimes, JavaScript will use this information in addition/instead
-   Multiple arguments are separated by &: `?x=1&y=2`
    -   Argument can be given several times: `?x=1&x=2`
        - Note that this does not ‘override’ the previous value of x the way it would as a variable.

### Summary
- So…
http://site.com/some/page.html?x=1
means

-   Turn “site.com” into `123.45.67.89`
-   Connect to `123.45.67.89`
-   On port 80 (the default)
-   Using the HTTP protocol
-   Ask for /some/page.html
-   Pass along query string: x = 1

