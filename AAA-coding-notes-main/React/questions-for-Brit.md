
---
date: 2023-05-01
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

- Why testing html of form input directly didn’t work

- Testing using the DOM - 
	- Felt like the tests in the react unit didn’t as directly test what was in the DOM as we did earlier when using jquery, etc.
	- Is the reason for this because we’re trusting/leaning on react to work as expected? 
- When testing with react, what level is sufficient?
	- snapshots
	- testing using DOM 
		- examples/checklist of test that would give good safety
		- OR
		- how do you determine if enough tests?
- Unit vs integration tests with react:
	- unit testing = smaller components
	- integration testing = testing the higher up components that call the smaller components?


unrelated questions:
- for jobly deployment with surge - if updates are made, does it need to be manually redeployed? 
	- build command
		- can make production ready static files
- Out of curiosity - will we be starting data structures next week, or after professional projects?


Tests:
jest-dom - 
examples of things you should look for

test what the user sees: 
test values displaying in form is correct
testing right number of inputs
testing that the right labels are there
when fire click, then that function was called one time


can’t test state 
limited to when fx gets called, what can I test

like with jobly home page:
- if logged in: should see welcome back not login/signup

What is the state of the DOM right now?
-How does that change as user input?



Componets are integration tests:
-testing how things work together
- not even calling our own components

boxList: 
- no way 


-& Test presentational components first
