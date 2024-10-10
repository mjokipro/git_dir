- In Browser, when you see the error message - look at the <u>last error</u> this is the one that set off the cascade of those errors

## JavaScript Debugger  
◦ Watch execution of code and examine at any point  
◦ Built into Chrome (other browsers have similar abilities)  
◦ Can debug in-browser code or Node

### Starting Debugger
- View code or add “breakpoints”:
	- View → Developer → Developer Tools → Sources tab
- Click left of line of code to add a blue breakpoint
	- Can put breakpoint into code itself:
```js
function myFunction() {
  let x = 1;
  
  debugger;   // <-- will always stop here
  
  // rest of code follows ...
}
```

### Call Stack
- Shows _stack_ of function calls that got you here

![_images/call-stack.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/js-dev-tools-debug/handout/_images/call-stack.png)

### Scope
- Shows current value of variables
- Can click to change value
![_images/scope.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/js-dev-tools-debug/handout/_images/scope.png)

### Step Over
- Run current line, but don’t debug into any function calls
![_images/step-over-outline.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/js-dev-tools-debug/handout/_images/step-over-outline.png)

### Step Into
- Run current line, stepping into any function calls
![_images/step-into-outline.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/js-dev-tools-debug/handout/_images/step-into-outline.png)


### Step Out
- Return from this function to caller
![_images/step-out-outline.png](https://rithm-students-assets.s3.amazonaws.com/r30/lectures/js-dev-tools-debug/handout/_images/step-out-outline.png)

### Common JavaScript Bugs
-   == is very loose about comparisons (=== isn’t)
    -   `7 == "7"`
-   Objects & arrays are not equal to similar objects & arrays
    -   `[1, 2, 3] !== [1, 2, 3]`
-   Calling function with missing arguments makes those arguments undefined
-   Calling function with extra arguments ignored them
-   A missing property from object _or_ missing index from array is undefined

## Elements Debugger (for html/css )
- Using the elements tab you can:
-   View the DOM
-   Modify HTML and CSS _(not permanently)_
-   Examine what CSS has been computed and applied
-   Examine what event listeners have been added
- & Prevent Caching: Disable caching in the browswer to prevent frustrating things from happening, and <u>keep your dev tools open when coding</u> 
	- Disable within dev tools under   `Network` –> `Disable cache`

## Network debugging
- #tip Joel - Helpful to check the option to `Preserve log` under the network tab in the debugger, because this will keep all logs of requests. Particularly useful for figuring out page reloading issues (like forgetting a event.preventDefault(), etc. )
- #tip Joel - When making [[api]] requests, good idea to review data in the `Response` and `Preview` options in the debugger tool to see what data is returning from the api. 