## Browser form submission
- When [HTML form](form-element) data is sent via the browser, it is sent to location specified in “action” attribute, via the “method” attribute way, under the “name” provided (note: not “id”):
```html
<form action="www.somewhere.com" method="POST" name="login-form">
	...
</form>
```
- Once the form is submitted, the URL changes to include `?[action-value]` at the end

## AJAX submission
- When working with AJAX, we ‘preventDefault()’ to stop this submission, but it is good practice to put in place a safeguard for yourself in case this line is forgotten
```html
<form action="handled-by-ajax">
	...
</form>
```
- This way, if ‘preventDefault()’ is accidentally forgotten, this would appear in the URL, as a larger signal to you about what went wrong