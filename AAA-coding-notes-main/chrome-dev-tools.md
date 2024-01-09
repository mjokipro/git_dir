
---
date: 2023-04-05
metadata: true
concepts: ['chrome-dev-tools', 'node', 'express', 'testing']
status: 'post-lecture'
docs: 
cite: ['rithm']
---

## Chrome Dev Tools Guide
- Step-over: ![](../assets/image/debug-chrome-tools-node-1680752457138.jpeg)
	- go to next line. If that line calls another function, *don’t go into* that function code, instead go to next line. 
- Step-into: ![](../assets/image/debug-chrome-tools-node-1680752475807.jpeg)
	- go to next line. If that line calls another function, *go into* that function’s code. The next line will be inside that function’s code, and would go line-by-line inside that function.
	- ! Be care of this if you are using libraries, or console. Step-into will go into that library’s code.
- Step-out: ![](../assets/image/debug-chrome-tools-node-1680752493508.jpeg)
	- Move out of the current context and into the next outer scope. 
- Step: ![](../assets/image/debug-chrome-tools-node-1680752530220.jpeg)
	- !! Avoid!

## Node/Express Guide:

1. & Start up Node:  Test files and ‘regular’ code (`app.js`, routes) differ at this step.
	1. For ‘regular’ code:
	```shell
	$ node --inspect-brk server.js
	```
	2. For testing files:
	```shell
	$ node --inspect-brk $(which jest) --runInBand NAME_OF_FILE.js
	```
2. Open `chrome://inspect`  in a *new tab/window*
3. Click on the `inspect` link under *Devices > Remote Target > Target*![](../assets/image/testing-with-jest-1680646559304.jpeg)
4. & *Node* and *Express* differ at this step:  
	1. For *Node:* All done! Utilize debugger ![🎉|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f389.svg)
	2. For *Express*:
		1. Server is initially paused – need to click *play icon* ![|30](../../assets/image/intro-express-1680745516608.jpeg) to start server listening for requests.
		2. Then *make a request* to target endpoint to get to debugger statements. (either through insomnia or browser)
![](../assets/image/debug-chrome-tools-node-1680752589650.jpeg)


