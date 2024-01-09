A library for:
-   Manipulating the DOM
-   Adding event listeners
-   Animating elements
-   Making HTTP requests (AJAX)

## Why should you learn jQuery?
-   Brevity and clarity
-   Cross-Browser support
-   AJAX
-   77% of the top 1,000,000 most visited pages use it

## Enabling jQuery
- Once you include jQuery script, you have access to global $ in browser
```html
<script src="https://unpkg.com/jquery"></script>
```
- % Note: $ in the browser 
	- Just because $ has a value in your browser’s console, this does _not_ mean that the page you’re on necessarily uses jQuery. Most browsers reserve $ as a sort of shorthand for document.querySelector, unless some library overrides this behavior.
	- If you see something like `ƒ $(selector, [startNode]) { [Command Line API] }` as the value for $, this means that jQuery is _not_ installed. On the other hand, if you see something like `ƒ (e,t){return new he.fn.init(e,t)}`, this means that a (minified) version of jQuery has been installed.
	- `$` is just a shorter alias for a global jQuery object when jQuery is loaded, so another test is just to check in the console whether there’s a global variable called jQuery.

## Selecting elements
- Just as easy as CSS selectors
```js
$("ul")
// like document.querySelectorAll,
// this will select ALL uls

$("#todo-container")

$(".carousel-image")
// like document.querySelectorAll, this will
// select ALL the elements with that class
```
- This gives us a jQuery object
	- & jQuery objects are NOT the same as DOM elements
	- If you need to convert jQuery object to DOM element, this is uncommon, use the jQuery object. If indeed needed though, can convert this way:
	  ```js
	  let $listItems = $("li");
	  $listItems; // a jQuery object

	  $listItems.get();
	  // an array of HTMLLIElements

	  $listItems.get(0);
	  // the first HTMLLIElement
```

## jQuery methods
-   .val() – can get value of text input, select option dropdown
-   .text() – same as innerText in JS
-   .attr() – same as getAttribute(attr) & setAttribute(attr, val).
	- If one argument, functions as getter
	- If two arguments, function as setter
-   .html() – same as innerHTML
-   .css()
-   .addClass() / .removeClass() / .toggleClass()
-   .empty() / .remove()
-   .append() / .prepend()
-   .find() / .closest() / .parent() / .next() / .prev()
- insertBefore(el) – inserts element before the ‘el’ passed in
- slideUp() / slideDown() – takes element content and slides up/down with built in css animation.

## storing jQuery in variables
- It’s a common convention to <u>store jQuery objects in variable names that begin with $.</u> 
```js
let $firstName = $("#firstName");
let firstName = $("#firstName").val();

// 200 lines later...

console.log($firstName);
// the jQuery object for the input element

console.log(firstName);
// not the jQuery object for the element!
```

## jQuery getter / setter pattern

-   Vanilla JS: `.getAttribute(attrName)` and `.setAttribute(attrName, newValue)`
-   jQuery: `.attr(attrName, newValue)` _(second param is optional)_

## chaining with jQuery
- Almost all jQuery methods return a jQuery object, which allows for _method chaining._
- Instead of performing DOM operations line-by-line, we can chain method calls together on a single jQuery object.
Vanilla JS:
```js
const tasks = document.querySelectorAll(".Task");
for (const task of tasks) {
  task.style.color = "red";
  task.innerText = "Please do this!";
  task.addEventListener("click", completeTask);
}
```
jQuery:
```js
$(".Task")
  .css("color", "red")
  .text("Please do this!")
  .on("click", completeTask);
```
- & Note the difference between these two scripts: jQuery abstracts away the iteration through tasks  for us. 

## Creating elements
- Instead of using `document.createElement("li")` we can simply create an element using `$("<li>")`
- `$("<li>")` Create a new li   // Note inclusion of < > brackets
- `$("li")` Select existing li elements
Vanilla JS:
```js
let footer = document.getElementById("footer");
let newItem = document.createElement("b");

newItem.classList.add("message");
newItem.innerText = "Hey!";
newItem.insertBefore(footer);
```
jQuery:
```js
let $footer = $("#footer");
$("<b class='message'>Hey!</b>").insertBefore($footer);
```

### DOMContentLoaded
- With vanilla JS we have DOMContentLoaded; the jQuery equivalent is:
```js
// waits for the DOM to load
$(mainFunction);
// Or variation:
// waits for the DOM to load
$(document).ready(mainFunction);
```

## Event Delegation with jQuery
- jQuery’s on() works similarly to addEventListener. It lets you specify the type of event to listen for.
```js
// logs when item with id "submit" clicked
$("#submit").on("click", function() {
  console.log("Another click");
});

//alerts when ANY button is clicked
$("button").on("click", function() {
  console.log("button clicked!");
});
```
### Why use on()
In most cases, click() and on(“click”) will both get the job done. However, there is one key difference:
-   .click(callback) is a shorthand for .on(“click”, callback)
-   on() accepts optional argument between type of event and callback
-   This flexibility allows us to leverage _event delegation._

### Event Delegation
- Event delegation allows us to attach an event listener to a parent element, but only invoke the callback if the event target matches a certain selector.
- Not unique to jQuery, can do this with JS too.
- More performant– This will work _even if elements matching the selector don’t exist yet!_
```js
function deleteMeme(evt) {
  // delete meme...
}

// Add listener to each meme (old way). 
// ONLY works if it exists on page load
$(".meme").on("click", deleteMeme);

// Add listener to meme container (event delegation). 
// Works even if it doesn't exist on page load
$("#meme-container").on("click", ".meme", deleteMeme);
```

## Do you actually need jQuery?
-   The DOM API is much more standardized than it used to be
-   It doesn’t do anything you can’t do on your own
-   jQuery is an extra dependency
- [You Might Not Need jQuery](http://youmightnotneedjquery.com/)
	- General philosophy is that if you want to use jQuery because it makes building your app better, great! Go for it. But if you’re building a library, it’s worth asking whether you _need_ a dependency like jQuery.
- No point for a company to rewrite code that works
- jQuery still best for manipulating DOM on a small scale.
- For larger projects, Angular, Vue, Svelte more opinionated and popular

## Documentation jQuery
- https://api.jquery.com/