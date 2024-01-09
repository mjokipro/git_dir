## Form Element
```html
<form method="post" action="where you want the data to go">
	<input type="" placeholder="" required>
	<label><input type="radio">Radio Button</label> 
	<!-- Label used to wrap input type and associate it with the corresponding text -->
	<input id="loving" type="checkbox"> <label for="loving"> Loving </label>
	<!-- May also associate text with input by using a for attribute with the same value as the input's id -->
</form>
```
- The `action` attribute is the URL the data is sent to when the form is submitted. 
	- Default is the same url that you are on to access the form
- The `method` attribute specifies *how* to send form-data to the URL specified in the `action` attribute. 
	- Default, if not specified, is a `GET` request.
	- The form-data can be sent:
		- via a `GET` request as URL parameters (with `method="get"`)
		- via a `POST` request as data in the request body (with `method="post"`)
- The `name` attribute becomes the key to access this data from the server side 
	- & Make sure to specify this `name` attribute!

### Nested elements:
- [[label-element]]
- [[input-element]]

Forms with DOM manipulation: 
- No matter how many inputs you have in your form, no need to target individually (WHY?) #questions
- Can just target this form with an id name
```html
<form id="create-note-form">
	<input
	type="text"
	placeholder="Write note here"
	name="newNote"
	required
	/>
	<button class="note-submit" type="submit">Create note</button>
</form>

<form id="search-form">
	<label>
	Search notes:
		<input
		type="text"
		placeholder="Type text to search"
		name="textSearch"
		/>
	</label>
</form>
```

- Create note: 
	- For forms, only event really ever going to use is “submit” which triggers when user clicks a button to submit or hits enter
	- prevent default behavior by e.preventDefault() to prevent page refresh and URL change
	- Then access data by e.target (to get access to DOM element)
	  e.target.elements allows access to all of the fields within form
	  access specific inputs by their name
	  representation of DOM element for the input
	  How to get value off of an input?
	  use value property
	  e.target.elements.newNote.value
	  once done with data, can also set the value to clear the form field (assigning vs accessing this data)
	  e.target.elements.newNote.value = “”
- Search form:
	- Does not need to be in a form  because it is updating in real time and not being “submitted” (?) #questions 

#refactor 
With form submissions, it is useful, and good practice, to provide each submittable element with a `name` attribute. This attribute is used to identify the element in the form submission.

Give each submittable element a unique `name` attribute of your choosing, except for the two `radio` inputs.