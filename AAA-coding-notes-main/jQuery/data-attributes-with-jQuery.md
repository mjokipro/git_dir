```html
<section data-show-id=2839482938>
	...
</section>
```

- To access data from a data-attribute on an HTML element from an event (click, etc.), these jQuery methods may be helpful
	- `.closest()`
		- Can further search for closest ancestor that has a data attribute with:
		- `.closest("[data-show-id]")`
	- `.data()`
		- Since all data attributes start with data- `.data()` just takes everything after ‘data-’
			- `.data("show-id")`
		- Note that `.data()` also immediately returns the value of the data attribute 
			- ! (i.e. don’t also try and use `.val()`)
			- `$(“section”).data(“show-id”) ` returns  2839482938