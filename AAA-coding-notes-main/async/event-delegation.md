
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

- & EVENT LISTENER FOR EVENT DELEGATION GOES ON THE CONTAINER