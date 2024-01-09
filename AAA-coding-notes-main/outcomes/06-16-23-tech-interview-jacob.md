
---
date: 2023-06-16
metadata: true
concepts: []
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## What to do in the few days before your interview


###### Interview day:

-  Usually still remote interviews
- Make sure to remove distracts - pets, roomates
- Make sure you have everything you need - water, snacks, pen and paper
- Test camera and microphone
- Keep neutral static background

- don’t want to detract from the interview at all

## During interview

#### Don’t: jump to coding immediately
- Can be tempting, esp if you think you know the answer

1. Confirm that you understood the whole question
	1. check input limits and edge cases
	2. confirm test inputs
2. Outline your proposed solution
	1. confirm that you should start implementing

Jumping in may mean spending time solving the wrong problem. Solving the right problem is more important that solving the problem quickly.

#### DO: Talk and listen to your interviewer

- They know what they are trying to evaluate more than you do
	- follow up quesions and ignored areas
	- think carefully when asked “Will it?” or “What about…?”
		- follow their lead
- They want to give you the chance to demonstrate your skills
	- They also act as a combined google/peer/ide
- They want to understand *how* you are solving the problem
	- Not just that you provided a solution
	- If you are stuck, they will try to un-stick you
Interviewers will try to guide you to show the skills they are looking for. Don’t ignore that.


#### Don’t: Misrepresent Yourself

- Natural to want to appear ‘good’
- Can set up unrealistic expectations
- On your resume, if you mention X
	- If X is a technology or language, be prepared to talka bout what it is and how you have used it
	- If X is a project, be prepared to talk about what you contributed
	- If X is an interest, be prepared to talk about why
- In the interview
	- Be honest if you’ve seen a question before
	- Be honest if you don’t know something
	- External help (Google, friends, etc.) is an extreme form of misrepresentation

Misrepresentation, at best, may get you a position where you don’t have the support to grow. At worst, it’s flatly disqualifying. Be honest

Exposure: used some
Experience:  used more
Or list amount of time

just don’t set yourself up so that the interviewers impression is much more inflated than what your skills actually are

#### DO: Have Questions

- Interviews are not one-way
- Questions demonstrate interest
- Questions let you evaluate the work and company
	- It’s no good to hire someone who quits in 6 months
- Ask recruiters about expectations and proecess!

Working for a company is a two-way street. Asking questions during the process helps you prepare, evaluate if you will be satisfied, and demonstrate that you’re taking things seriously. 

#### Don’t: put the answer over the process

- Tempting to focus on optimatl solutions
- But actual work is more complex
	- Interview questions are sharply time constrained
	- Interview questions need to be solvable in your brain
- But: Actual software engineering is so much more
	- Design, requiremetns, gathering
	- Testability, maintainability
	- Multiple developers, documentation

Interview questions act as a proxy for how you think about software problems. If all you provide is an answer, you’re leaving a lot of important stuff out.


#### DO: Practice

- Interviewing is a skill
- Practice talking through your projects
- Practice explaining how you’re solving problems
	- Talking about code you are writing is it’s own skill
- Practice with the coding environment(s) you will use

You can’t just have great skills. Practice how you will be presenting those skills as well. 

– practice with the code environemetns: hackerrank, etc. 
Do I get syntax highlighting, autocomplete, etc. 
Don’t want to be surprised by what is/isn’t available.


#### Assorted Tips

- You are inexperienced, and that’s fine
- A well explained approach is often better than an optimal answer
- Don’t ignore you pre-bootcamp background
	- How does it help you solve problems or work with people?
- It’s OK and normal to be stressed
	- Practice and mock interviews help
- Your interviewers are there to help
	- They want to see how you handle issues, not demand perfection
- Some of this is luck!

All that swe interview can do is whether you demonstrated what the interviewer was looking for, it cannot determine your value as a swe

- Most Interview Panels will have a period where they dive into your experience - this is the time to highlight this
	- not during technical interviews, which are pressed for time

- How much time to devote to DSA?
	- 1st - develop comfort writing code quickly
		- going to solve this problem 45 mins
	- 2nd - maintain + expand your toolbox - dynamic programming, arrays, trees, recursion
		- many questions he asks are about how to combine 2 tools in a new way a person may not have yet
		- be able to identify and explain why you are using specific tools

- How much weight used for the type of code you write? if/else vs ternary, ES6
	- each team is different about their opinion of readable code
	- Just make sure you put forth effort / thought in the readability of your code
	- for fundamental issues:
		- single letter variables - way more concerning
	- if you are missing significant areas of the problem
	- if you have written a huge long function instead of breaking it apart into smaller functions, also a problem

- Observations in current job market
	- job market not as good as it was 1 year ago
	- opportunity:
		- smaller start ups are hiring
	- google meta microsoft, hard to get hired
	- just may be harder to find startups

- How well can startups provide training?
	- 5-10 people startups - not a good idea
	- larger startups can usually still provide training

- what do you wish more jr. dev’s did?
	- ask questions
		- ask questions that are not directly attached to what they are working on
	- will see senior engineer do something in a certain way
		- asking questions can elucidate subtlties of the problem

- have interviews asked to build app?
	- yes, have lengthend interview 2 hrs
	- the larger the scope of the problem can see how a person deals with scope
	- can be exhausting to code for 2 hrs with someone watching
	- success with take home questions:
		- interview there: come in with app built
		- spend 30 mins saying why you built it this way, what problems
		- okay, can you now add this small feature to it
			- hesistant to ask for take home
				- fear - even if you say only spend 3-4 hrs, ppl spend much more time trying to make it perfect

- differences between cs grads vs bootcamp grads
	- cs grads: really at the top of algo game right as they graduate
		- a star?
		- often a hyperfocus on what is the right algo, and applying it correct
	- bootcamp: practical approach
		- not sure exact approach, but I can make progress here
			- can be strength
		- danger: working yourself into a corner
		- or if there is a pressure to be the cs grad algo, and you’re not willing to take first suboptimal step
		- typically more likely to ask questions if problem isn’t totally specified
			- this is also a strength
		- embracing: let’s make progress, let’s keep working on the problem, let’s not worry about it being optimal out of the gate

- during interview - what is weighted the most?
	- whiteboarding
	- portfolio
	- github readme
	- varies by company and recruiter, etc.
	- in his experience - 2 faces to getting to interview
		- they are looking for different things
		- someone non technical
			- github readme’s, portfolios
		- someone technical
			- likely not concerned with most of this
			- sometimes looks at github profile, but higher weight to the actual tech interview
			- if you have made contributions to well known open source projects - I have some idea of the standards to which they hold ppl to. 

- Pet problems - fav gotchas
	- very underspecified problems that rely  - common interpretations of words that may not related
	- write a function that takes a string, and returns true if that is a number, false otherwise
		- Gotchas: What do you mean by number? “one” or negative numbers, etc.
	- 2 part questions where second part subtly violates the constraints relied on for the first one
		- you’ve gone through the first piece of the question
		- follow up will change an assumption you’ve been relying on
			- do you notice
			- do you reevaluate 
			- or do you just make the smallest change to fit criteria
		- word ladders
			- 2 words in dictionary
			- change 1 letter each step
			- Follow up:
				- produce all of the paths
				- almost always keeping a list of all paths 

- how difficult/complex are take homes?
	- still should be somewhat simple
	- should be moderately interactive
		- not a list sorter - because this is boring
		- vs react app task 
	- should be very easy for the candidate to confirm that they’re correct
	- examples:
		- maze solver
			- interactive
			- obvious if it works
	- Ask interviewer how much time it should take?

- Resources to recommend:
	- Cracking the coding interview
	- [Structured and Interpretation of Computer Programs](https://www.amazon.com/Structure-Interpretation-Computer-Programs-Engineering/dp/0262510871)
		- [free version](http://library.lol/main/2E2D076C195F245EED60A5D3B00BE993)
	- lean on your community

- how did land your job at google and why do you think they hired you?
	- 14 years experience
	- Google is weird
		- wouldn’t recommend for someone as 1st or 2nd job
		- relies on independence
		- google has own tech island
			- has built own internal tools
			- don’t know what config - deployment looks like when it’s not at this company

