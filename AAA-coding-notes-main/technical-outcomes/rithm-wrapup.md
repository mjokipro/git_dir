
---
date: 2023-06-09
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## What We Covered

It’s easy to remember the new languages & frameworks we covered.

Let’s look at the other things.

### Problem Solving

-   Frequency counters
-   Divide & conquer
-   Solve a simpler problem first
-   Multiple pointers
-   Runtime and Runspace

![_images/cci.jpg](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/rithm-wrapup/handout/_images/cci.jpg)

[Cracking the Coding Interview](https://books.google.com/books?id=jD8iswEACAAJ)

-   Overview of common DSAs
-   Challenges with hints & solutions
-   Excellent, well-organized
-   Code is in Java, but very readable

![_images/alg-puzzles.jpg](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/rithm-wrapup/handout/_images/alg-puzzles.jpg)

[Algorithmic Puzzles](https://books.google.com/books?id=fY1pAgAAQBAJ)

-   Logic problems for comp scientists
-   Code-free! _(focusing on thinking)_
-   Helps learn to think algorithmically

### Intermediate JavaScript

- All of our week 1 & week 2 JS lectures
- We covered a lot! Take time to review it

![_images/js-definitive.jpg](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/rithm-wrapup/handout/_images/js-definitive.jpg)

- [JavaScript: The Definitive Guide](https://www.amazon.com/JavaScript-Definitive-Most-Used-Programming-Language/dp/1491952024/)
- O’Reilly subscription website
	- learning.oreilly.com 
	- few hundred $ / year

![_images/mdn.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/rithm-wrapup/handout/_images/mdn.png)

- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Object Orientation
2 chapters in js definitive guid that are very good

-   Classes, instances, attributes, methods
-   Inheritance, designing hierarchies

### Functional Programming

-   We covered some “functional idioms”
    -   map, filter, reduce, some, every
-   We introduced pure functions & changing by non-mutation
-   Lots of composition of small functions

### Testing
many programs don’t talk about testing. joel’s last job supervised many people and reported to ceo, will be testing throughout entire career.

-   This one is particularly important; many new devs don’t know this
	- Talk about our experience with testing
		- what are the important tests
		- what are the risks of false positives?
		- make sure things fail for the right reason
			- particularly important when handling sensitive data
	- business reasons why this happend:
		- computers used to be expensive, programmers were cheap
		- now programmers expensive, equip cheap
		- that’s why programming languages become higher level
		- Bugs are therefore so expensive
			- why documentation so important
			- why testing is so important

-   Unit vs Integration
-   Mocking
-   Coverage
-   TDD

penetration testing - pen testing

### Typing

-   Variable types and function signatures can be explicitly typed
-   This often helps prevent bugs and increase code clarity
-   Python has this built-in to newest versions
-   TypeScript is a “meta-language” of JavaScript adding this

## symbol - tommy question

- Symbols are *always* different
	- 100% guaranteed to be different
- well-defined symbols that come with js and have some meaning
	- Symbol.iterator:
		- if you assign this within a class to a function,
			- can make wholly unique identifier that defines how you would “iterate” over that class

## debugging - kate 

- reflect on all the strategies
- make a flow chart
- skill as an engineer could be defined by your skill at debugging
	- don’t guess and try
- when you get a bug: your attitude toward that bug determines your day

## professional coding - brit

- reflect back:
	- choose good names
	- separate concerns
	- keep things tidy
- curb appeal of your code
- ability of your code to survive
	- want your code to scale

## What We Didn’t Cover

- These aren’t **missing** things — they’re ideas for new areas to explore
- Please don’t postpone job searching so you can do any of these
- Instead, think of these as great things to experiment with while searching
- Or, even better, after you have a job

### Object Databases

-   While SQL is dominant, NoSQL / Object databases are common
-   MongoDB is a good place to start here
-   Could be a good learning opportunity to make Jobly backend in Mongo
	- when learning a new tech, better to convert something you’ve already written, cause if you build some new idea you often build a perfect example for that new tech, vs coming into contact with harder things to do.

### Regular Expressions

-   A small mini-language for searching and parsing text
    -   Can be used in JS, Python, VSCode, and many other places
-   One of the most useful tools for many devs
    -   But it’s easy to miss learning about it

### AWS

-   Most companies use cloud-based servers and systems
-   Playing with AWS to learn about the different offerings is helpful
- this stuff is free for a year

### Docker
snapshot of everything down to the operating system
those images when their run get turned into containers
if you want everyone on the team to have the same deployment
all run docker and get the exactly same experience
like a virtual machine, but pretending that you have a computer that runs 1 thing
For dev ops environment and often for server that is deploying the app

-   Many companies use for deployment
-   Many companies use for developer environments
-   Learning a bit about this and trying it out can be helpful

### Machine Learning/AI
specialized topic similar to cryptography
book: you look like a thing and I love you
online free course from stanford on machine learning

-   This is a large topic!
-   But most developers don’t develop particular expertise here
    -   Instead, a great deal is learning _about_ common algorithms
    -   Understanding the math/stats behind them is more specialized
-   There are lots of gentle online courses on this

will we be out of jobs b/c of ai?
first compiler: argument that we wouldn’t really need programmers anymore -1956
grace hopper
consistently over time, we’ve adapted to give computers harder and harder problems

### Other Types of Languages

-   Learning a new-but-similar language probably won’t teach you much
    -   It’s just more syntax for the same kind of thinking
-   Learning a bit about a very different language can be helpful
    - Joel advice: could go in 2 different directions:
        - go even higher/more abstract: haskell, racket (but never going to get a job in this)
        -   In particular, learning a bit of a lower-level language, like Go or Java
		- machine code numbers → assembly language 3 letter code
		- Rust() - attempt to make language that operates same level as C, but with more in it. Joel thinks its better than C, but insanely hard to learn, especially as 1st lower level language
		- C++ - still managing space, many video games written in C++
		- Go - similar to C, made by one of the creators of C. used to build web servers. developed by google, how does memory get managed
		- Java - approachable, exposes what is programming like, when we have to think about lower-level pieces
		- Kotlin - much easier to learn, android apps, but abstracts a lot from you, so won’t learn as much if this is your low-level language.

– Python ships with library called timeit
	- times your code

– Web assembly
	- generally speaking, browsers only knew how to speak js
	- extraordinarily low level
	- browsers now know how to run this
	- can write your front end code (say in kotlin, python) and have it compiled to web assembly
	- unclear where this will lead - to more or less javascript
	- if you have a heavy math problem - may be with another language that compiles faster and then compiled to web assembly



## Areas of Development
### Frontend Development

-   The easiest entry point for most grads
-   You have excellent pre-requisites!
-   Don’t forget to keep practicing CSS and vanilla JS!

### Backend Development

-   Less common, but some graduates enter here
-   Definitely practice databases, node, and Python!
-   Often, interviews here may have more data structure parts

### DevOps

-   Often combines testing, logging, and deployment
	- higher level testing, coding at scale
-   People sometimes do go from bootcamps to here
    -   Helpful to learn more about OSes and Docker, learning in shell

### Security

-   Generally, don’t directly hire bootcamp grads
    -   There’s often specialized background needed
-   Some companies have internships to introduce new security developers

## How to Get Better

### Keep Practicing Algorithmic Problems

You can find an infinite supply of these at LeetCode or CodeWars

### Keep Writing Apps

Keep your memory of APIs and techniques fresh!

### Study Productively

Check in with yourself if you’re really learning.
Learning is an active process - practice every few minutes

### Use Memory Reward Tricks

- Practice simpler things than you think much of the time
	- practice things you already know how to do for a much longer period of time
	- after you do it for 1st time, do it in 1 week, do it in 3 weeks → spaced repetition
- Mix in novel information after succeeding at that

## How We Can Help

-   We continue to give you access to our curriculum
    -   And if we make big changes, we’ll let you know
-   Our outcomes team is available for all kinds of support while job searching
-   We provide support for alums on technical issues

-   Keep in touch with your advisor
    -   We can offer advice on your learning plan or any offers
-   We’ll keep your Slack open!
-   We have periodic alum nights with games and lightning talks

## How You Can Help

Help each other!

-   Study together
-   Share useful resources
-   Ask each other for debugging ideas

Maintain this network!

-   Support is so helpful when job searching
-   Having a network of peers that grows with you is great
-   You’ll be able to recommend and recruit each other


1. talk about someone who’s helped you at Rithm
	1. have a specific person
2. thank someone not here
3. tell us what’s changed for you 