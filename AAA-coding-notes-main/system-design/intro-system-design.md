
- tens of millions of users: wouldn’t want to build with a flask app

## Goals

-   Define _reliability_ and _scalability_ in your own words
-   Discuss differences between _horizontal_ & _vertical_ scaling
-   Describe what _elasticity_ is
-   Learn techniques for robust, efficient, & scalable web apps
    -   Load balancing, content caching, and database indexing
-   Describe _monolithic_ system architecture vs. _service-oriented_ architecture

## Reliability

> A reliable system continues to work correctly even when things go wrong.

- it means being resilient when things go wrong
### Expectations of reliable systems

- The application performs what the user expects
- It tolerates user making mistakes or using software in unexpected ways
- Its performance is good enough for the required use case, under the expected load and data volume
	- If 2 weeks before holidays, what’s the traffic like, and build for that plus some wiggle room
- The system prevents any unauthorized access and abuse

### Faults and Failures

- **Fault is a deviation from spec or a instance of something bad happening.**
	- Hardware faults include: hard disks failing, RAM failing, power outage, someone unplugs the wrong cable.
	- Software faults include: servers crashing, runaway processes using too much memory / CPU, certain user inputs triggering unexpected behavior.
- **Failure is when a system stops its required service to the user.**
	- Reliable systems should be *fault-tolerant* or *resilient*.
	- When a fault stops the system from doing what' it’s supposed to do

### Importance of reliability

- Reliability is important for all systems.
- Reliability affects every company’s brand / reputation. (see Equifax)
- The extreme case is human life being at risk 
  (airline software, car software, nuclear power plant software).
- _Software As A Service_ (SaaS) companies have Service Level Agreements,  
  eg “we guarantee our web app will be available 99.9% of the time.” Amazon, Heroku, etc.
	- If not, then get 10x your money for that year back
	- often talked about how many 9’s - this is really great, have 4 nines (meaning 99.99)

## Scalability

One possible definition:

> The ability for a system to efficiently handle increased load.

### Load parameters

- **Critical factors that will interfere with system’s ability to perform reliably.**
	Examples:
	- More users visiting the site  
	- Requests per second to a web API
	- Ratio of reads / writes to a database
	- Number of active users in a chat room
	- Anything that bottlenecks your system

Think about the system handling more of the things you want it to do, within reason
(so not 2K to 2 billion)
Scalable does *not* mean rebuilding the app

## Scaling

### Vertical scaling

**Scale Up** by increasing available computing resources  
(eg, CPU, RAM, disk space)
- NOT using more servers
- Pay for a Bigger server, but this is not getting another server

advantages:
- don’t need to change your software
- very easy to vertical scale just slides the scale

disadvantage:
- gets very costly at high scales

![_images/vertical-scaling.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/vertical-scaling.png)

“You’re gonna need a bigger boat.”

### Horizontal scaling

**Scale Out** by inserting additional (redundant) nodes.
- this is about buying more servers

Sometimes requires architectural adjustments.

advantages:
- often more cost efficient
- if one server fails, others back it up

disadvantage:
- likely need to adjust software, more complex code, things have to talk to each other, etc.

![_images/horizontal-scaling.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/horizontal-scaling.png)

“You’re gonna need… some more boats?”

### Elasticity

Some systems can automatically scale when they detect increased load.

![_images/elasticity.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/elasticity.png)

This is why you’ll see the word “elastic” everywhere in AWS:  
EC2 (Elastic Compute Cloud), Elastic Beanstalk, ELB (Elastic Load Balancer)

## Techniques for improved performance

Three must-know techniques to increase performance and scalability:

- ![⚖|40](https://twemoji.maxcdn.com/v/14.0.2/svg/2696.svg)  Load balancing  
- ![📷|40](https://twemoji.maxcdn.com/v/14.0.2/svg/1f4f7.svg)  Content caching  
- ![📇|40](https://twemoji.maxcdn.com/v/14.0.2/svg/1f4c7.svg)  Database indexing

### Load balancing

_Load balancing_ refers to efficiently distributing incoming network traffic  
across a group of servers, also known as a _server farm_ or _server pool_.

![_images/load-balance-diagram.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/load-balance-diagram.png)

- load balancers route traffic to leverage all of your servers

### How load balancers work

A load balancer:

-   Distributes client requests or network load efficiently across multiple servers
-   Ensures high availability/reliability by sending requests only to online servers
-   Provides the flexibility to add or subtract servers as demand dictates

### Load balancing algorithms

- Round Robin
	- Requests are distributed across server group sequentially.
- Least Connections
	- Request sent to server with fewest current connections.
- IP Hash
	- Sent to same server handling previous requests from that IP address.

### Content caching

- Web APIs are susceptible to issuing redundant responses that would each require round-trips to database and application-level processing.

- However, if the content doesn’t change often:  
	- can use a proxy/cache server (eg, [nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)) that caches responses for period of time (TTL, “time to live”)

![_images/nginx.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/nginx.png)

- NGINX proxying and caching an app.
- Content Caching can drastically reduce load on servers.

Here’s a simple NGINX setup:
```
http {
  ...
  proxy_cache_path /data/nginx/cache keys_zone=one:10m;

  server {
    location / {
      proxy_pass           http://localhost:8000;
      proxy_cache          my_cache;
      proxy_cache_methods  GET HEAD;
      proxy_cache_valid    200 302 10m;
      proxy_cache_valid    404 1m;
    }
  }
}
```

- Cache for 10 minutes
- This configuration says to cache successful GET requests for 10 minutes and to recheck 404 responses after one minute.

### Database indexing

- Reading from a database gets slower and slower as the table gets larger.
- Querying users by first\_name or last\_name takes O(n) time to scan all _n_ records.
- You might consider creating an index on those columns.
- An index copies that data into a binary search tree, providing O(log n) look-ups.

### Logs are legit

For 1,000,000 rows, instead of a scan of all, we’d examine log<sub>2</sub> 1\_000\_000 ≈ 20

### Trade-off with indexing

- Why don’t we index everything?
- Creating an index copies data into this tree, using O(n) additional space.
- Furthermore, every INSERT, UPDATE, and DELETE query now has to work on two different structures, slowing those down.
- **Conclusion: typically, only index columns in tables that are READ-heavy.**  
	- In other words, more reads than anything else.
	- Index in situations that are *read* heavy

- ~ Tip
	- How to create an index with PostgreSQL
	- To create a B-tree index on the column title in the table films:
	```
	CREATE UNIQUE INDEX title_idx ON films (title);
	```
	- You can create different kinds of indexes for complex cases, as well as _compound indexes_ (one index for fields that are often queried together, eg first_name + last_name)

## System architecture

### Monolithic

- A monolith is when your product is one application.
- Ruby on Rails and similar frameworks are often monolithic. Different user-parts (blogs, calendars, etc) live in same application.
- This often promotes design and security, but can lead to non-explicit interdependence of pieces, and can impact maintenance/complexity.
	- Some parts of your application may be dependent on itself and not obvious that this dependency exist.  Sean’s blog uses Kevin’s calendar function, but Kevin doesn’t realize 
	- No silver bullet or clear one fix, but something to think about

![_images/monolithic.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/monolithic.png)

### Service Oriented Architecture (SOA)

- As apps grow, companies sometimes split them into a _SOA_ architecture.
- This essentially means breaking up a monolithic app into several different key services that are typically owned by a dedicated team.
- Example: might have shopping cart service separate which is from product page service which is separate from search service

### Monolith to SOA

- we built jobly, Joel would call this monolithic
	- we had some tools to keep 
	- Search was totally different app than other components
	- 7 react applications and 3 other applications

![_images/diagram-soa.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/diagram-soa.png)

Marketing material from an SOA company.

### Microservices

- & Microservices is a kind of architecture that is a subset of SOA, where the emphasis is on splitting up the services to be as tiny as possible.
	- what if every RESTful resource was its own app with its own databases
	- like flask app with every route - 
		- different app for user page vs detail page, etc.
		- each of these apps may use different stacks: one may be written in go, vs python, etc.

What if every REST-ful resource was its own API with its own database? For example, a users API, a messages API, a jobs API, a companies API.

Possible advantages:

-   Interdependence between parts is more explicit
-   Different resources can use very different tech stacks

![_images/microservice.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/microservice.png)

Possible disadvantages:

- Negative impact on performance from re-authenticating/data-sharing
- Complexity moves from internals of app to interfaces between apps

- & Cannot remove complexity, can only move it around
	- But how you move it around can make it much easier to work with
	- depends on strengths of teams

- this idea of splitting things up into small systems has been around for a long time. “microservices” term has been around for last 10 years
- now trendiness going toward monolithic, because of extra complexity that happens if 1 person leaves and that person was the only person that wrote that language. 
- sis is monolithic, but rithm school has 3 systems: survey porcupine, sis, and website, so it’s mildly SOS

## Dev ops

Developer Operations: role that handles operations of apps:
- deployment
- logging
- monitoring
- _(sometimes)_ integration between services
- _(sometimes)_ security auditing
	- often times separate people if large company

- security team comes and investigates your code

## Deployment possibilities

- There are lots of different ways apps get deployed, from “most real” to “most virtualized”

### Real servers

Apps are installed on physical servers
-   Company has complete control over setup & security
-   Many companies don’t want to purchase/maintain servers
-   Difficult to keep security patches up to date
-   Can be cost-saving (for constant needs) or costly (for lumpy needs)

### Cloud servers

Apps are installed on cloud servers:

![diagram](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/diagram-6449ef213911d524eac4e8f403966b2f315d4b56.png)

-   Easy to ensure consistency of OS setup
-   Easier to provision new cloud servers than set up real servers
-   Can pay by the hour, and get performance only when needed
-   Can scale servers virtually, without needing to upgrade/transfer
-   Popular example: Amazon Web Services’ [EC2](https://aws.amazon.com/ec2/)

### Virtual machines

Operating System running inside another OS
-   Allows running different OSes on same computer (eg, OSX + Linux)
-   Can be used to _isolate_ applications, so one crashing won’t crash others
-   Can help with security and compatibility concerns
-   Excellent for you to try out different OS setups
-   Good place to start: VMWare or VirtualBox

![diagram|400](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/diagram-481d1d5391ec2509ae1bfb14ab3159cd8f835440.png)

Ubuntu and Windows running on a Mac

### Containers

Lightweight, single-purpose, mini-virtual machines
-   Easy to ensure consistency of applications
-   Can share same setup from development to production
    -   Very often, all developers use the same setup
-   Great for trying software that is difficult to install
-   Very common: [Docker](http://docker.com/) or [Kubernetes](https://kubernetes.io/)

![diagram|400](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/diagram-1c1aa1b029f5388795e9d796914b743200dc98f0.png)

Shared environment

Two typical use cases for this:
- Ensure consistency for deployment
	- pretend we’re all on exactly the same 
- Consistency across one company
	- help the set up across developers
	- give you this instance in development because this is the exact set up for production

### Lambda functions

- Very tiny single functions available as an API
- Useful for low-cost high-scaling
- Often used with tiny microservices
- Often used with simple APIs (like for IoT devices)
- Are often part of _serverless_ solutions
	- little bit of a lie, always a server or computer you are talking to
	- they mean not your server, not something that you have set up and install
	- not buying a server in the cloud
- Very common provider: [AWS Lambda](https://aws.amazon.com/lambda/)

![diagram|400](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/tech-sys-design/handout/_images/diagram-d11a24e03384748c952bc819d981bd63d3dcb029.png)

Lambdas doing work for JS

word lambda - back in the day - lambda was used for functions

brew install lolcat and brew install cowtalk

1. bring pen and paper
2. use debugger
3. go as slow as you need to 