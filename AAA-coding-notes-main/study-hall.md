
---
date: 2023-04-03
metadata: true
concepts: ['system-design', 'python', 'flask', 'wtforms', 'js', 'git', 'chaining', 'oop', 'encryption']
---


## Unsure

- Should the BE API server return the index.html
	- Real life more likely to have separate server that hands back assets/HTML vs JSON
	- BUT be careful of same origin policy:
		- If your js is getting info from a different origin/different server

## System design

- Single page application (SPA) vs Multiple page application (MPA)
	- SPA: stay on the same page, the links just change what html is displayed
		- everything happens in js
		- can never be secure - can never trust the front end fully
		- difficult to debug - because info is client side
		- 
	- MPA: 
		- multi-page apps with some fx in ajax can also be nice

## python

- python typing
	- optional, don’t have to use it
	- not built in to language itself
	- typing is becoming very popular

- Global vars: what are they for?
	- GLOBAL_CONST: very useful for keeping things in one place, clarifying what consts are for (HTTP_CREATED = 201)
		- But global consts never change (lang of js or python can’t do this built in, but accepted convention)
	- global variables vs global consts, consts never change
	- not a great thing to have global variable that changes throughout your program
		- generally better to restrict globals to just global consts
- In python, global is a bit slippery
	- all variables in a file, are only available in that file, unless imported
	- may hear term “file-scoped variable”
	- fairly common to use file-scoped variables and import them elsewhere:
		- PI, SESSION_USERNAME, DEFAULT_URL
- In js, different, all of that js is read into all one big memory


--- 
1 hour 5 mins ish - break

## flask

- Where does python end and flask begin?
	- python does not have routing built in
	- flask uses python standard library for network connectivity
	- But eveyrthing about back end web applications specific to flask

## WTForms

- WTforms - what is it for?
	- generates html
	- provides validation
	- provides idea that form is its own thing
	- if you only want to use the validation:
		- still useful
		- there are other libraries that just provide validation piece
		- Both are used in real world and are good approaches (using 1 piece of a library, or using a library that is purely for that purpose)
	- if you are just using wtforms for validating trusted data, don’t need csrf, can turn it off


## Javascript

#### Where do you put your js

- previously: told that javascript needs to live in the head of html
	- this was fine, but may be a 1 sec pause before you see anything on your page
		- also, if your 
	- when you put a script src in: that’s when the browser has to stop and pause until that js loads
	- & Most important piece is to think about the order to place your script tag
	- 

## localStorage

- localStorage is 100% js idea
- localStoragle is good if you have js things
	- localstorage is only a string
- 
  ![](assets/image/Study%20Hall-1680545769802.jpeg)

#### JS Method comparisons

- map, filter, find, findIndex, some, every
- Cost of calling idiom function:
	- slight cost of calling a function vs loop
	- BUT increased readability is well worth that slight cost

- forEach is diff
	- older, even older than for…of 
	- but, doesn’t have any idiomatic advantage like the others
	- slight cost of calling function just to iterate, when for…of is just as easily readible and iterable.
	- Also can’t break out of loop or return early with forEach
		- which could be good or bad thing, depending on what you’re trying to do.
	- is a functional thing that isn’t quite an idiom


## Git

- A commit should be about one thing:
- Commits are your chance to rollback mistakes
- Granular commits
- Granularily can be squished together later to summarized into “added feature”
- Granular and about 1 thing
- Commit messages should be about the “why” b/c you can see what exact changes were made in github
- examples:
	- “L Flask Intro: BUG fails on upload #434”


## Chaining methods:

![](assets/image/Study%20Hall-1680548204528.jpeg)

## OOP vs functional programming:

- Functional programs - python and js not built to do true functional programming
- True functional programming languages: lisp scheme haskall - not really used in industry, more for exploring computer science / academically 

- putting fxs in a file - isn’t functional programming
	- But yes, very common to have OOP and programming with idioms

![](assets/image/Study%20Hall-1680549122081.jpeg)
- Classes give us a way to bring data and functionality together
	- When there is commonality around a concept
- BUT will always be things that are very generic
	-  Choice function in screenshot above
	- Suggestions for organizing these:
		- name file for what functions are in that file
		- instead of helpers.py –> random.py
		- curr_converter.py 
		- You may end up with many small files, that’s okay. Don’t want big box of stuff
		- In real life, going to run into to similar problems again and again, want to keep things organized 

Numbers api redone:
![](assets/image/Study%20Hall-1680549405379.jpeg)
or even:
![](assets/image/Study%20Hall-1680549443412.jpeg)

- & If you think it could be a class, try it out
- & Just like, if you think a function can be split, do it

## Two-way encryption

- enigma from ww2 brits hacked
- one way encryption: that data lost, not reversible
- mac: filevault: whole harddrive is encrypted

- end to end encryption: doesn’t leave original place until encrypted, and isn’t decrypted until it reaches the next place

- signal telegram: encrypted in your phone or on desktop. signal not doing the decryption, its already decrypted

## How to stay up to date:

- Tech twitter
	- greatest number of authors of libraries
	- follows react project, sqlalchemy, etc. on twitter
	- Or Mastadon
- Weekly newsletters:
	- javascript weekly
- Read blogs of specific companies
	- React
	- Typescript
	- Twitch
	- Django
	- Python

- Entire field - can’t know everything
	- Curate and be careful to not get overwhelmed
	- Too many react add ons, too many js frameworks