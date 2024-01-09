
---
date: 2023-06-07
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Goals

-   Review fundamental concepts of systems design
-   Explore the kinds of questions asked in interviews

### Architecture

- Scalability
	- plan for X growth - but not reasonable to plan for 20X growth
		- if you have 1000X more users in a day, you’ll have so many more things that would need to be redesigned - data models, etc.
		- plan for the unknowns, but not the unknown unknowns
	- is it scalable in the sophistication of what’s required?
		- have you built it in a way where you can
			- separate concerns
			- divide up codebase
			- can the complexity scale?
	- express can scale fantastic
		- you’ll want multiple servers, etc, as grow
	- flask/express more neutral about the data
		- this get pushed to postgres
	- can flask/express handle more developers, more features?
		- possible to build mansion with a nice box of tools
		- django works better for scalability because it’s more opinionated - allows 
		- analogy: react
			- its not like react is faster than vanilla DOM
			- but its easier to bring new people on, generally
				- but not always 
-   Caching
	- intimately tied to scalability
	- unlikely to ask about specific caching framework
	- be prepared to think about where caching could help 
-   Data Stores
	- relational databases: SQL 
		- benefits: one place for a fact, data integrity
		- also is popular/safe choice for many companies
		- good for when data is really structured
	- KVS - key-value-store
		- like a js object that is attached to a network
		- can store data really easily, just is not very organized
		- often get used for caching systems - like Redis
	- non-relational / no SQL databases
		- mongodb: 
			- schema more flexible
			- less structured data
			- store the same data in multiple places
				- faster for querying
				- harder for making sure you’ve updated info in all the places
			- want you want eventual consistency
			- speed over correctness 
	- sql and nosql becoming closer to each other
		- many problems could be addressed by either
- Deployments
	- be able to deploy on netlify, surge, render

### Tools

- AWS S3
	- type of cloud storage
	- if you stored a file in database 
		- flask has to query, then go get the file, then show it
- Load Balancers
- Auto Scaling
	- also called elastic scaling
	- traditionally: have 1 server, than eventually have 2 servers, but may be a time where shoulda had 1.5 servers.
		- cloud storage allows flexible scaling , can just spin up another server if traffic spikes
- Edge Computing / CDNs
	- often serve up open source libraries 
	- is there a way to get questions answered geographically closer to the user? (closer to the edge near the user)
	- want data to be as close to the users as possible


### Performance Monitoring

-   AWS CloudWatch / CloudTrail
	- not something that most engineers worry about
	- when you get this big, there’s a dev ops team
	- amazon has cloud watch: figures out your server is down, testing watching your site, and updates server, etc.
-   NewRelic
	- gives you insight on your site/data
-   Scout APM

### Databases

-   Read vs Write
	- ratio read: write
		- may be 1:1 or 1:1000
	- can lead to a very different design of the app
	- if lots of reading: likely more caching
	- instagram: if lots of writes
	- survey site: 98% writes
-   Replication and/or High Availability
	- having two databases kept in sync
-   NoSQL vs SQL
	- where should our data go?
		- usually team lead deciding this

## sidenote

- architecture can also be about:
	- separation of concerns
	- one engineer does not need to understand 100% of another
	- are you documenting your code in a way that it’s setting up a contract for the other engineers
	- Contract sets up: what are you really promising?
		- = docstring
		- this is how you build software that can scale
	- how will we think about the different teams, and what is their lane vs anothers? 
		- questions that lead to scale, maintainability, success in software

### An approach to these problems

- Understand the problem - ask questions right away!
	- your questions show your engineering
	- is there more reading or writing here
	- might there be a case where eventual --- comes in a case
	- do most ppl tweet or read tweets? 
- Propose a high level design and then dive deeper
	- how to build twitter?
		- database with users, tweets, likes
		- imagine large codebase
			- front end team
			- back end team
				- therefore would need to build an api
- Communicate
	- interviewer is thinking - do I want to work with this person?
- Iterate

### Resources our Students have used

- [https://www.educative.io/courses/grokking-the-system-design-interview](https://www.educative.io/courses/grokking-the-system-design-interview)
- [https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

- go back and work on sql ddl exercises about bernies bikes, etc. 

### A general warning

-   These questions are very vague
-   These kinds of questions are not extremely common for earlier stage engineers