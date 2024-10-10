
---
date: 2023-04-20
metadata: true
concepts: ['react', 'forms']
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Review previous

- figjam - free account - colloborate and save diagramming

## Goals

-   Build forms with React
-   Understand what controlled components are

## Forms

-   HTML form elements work differently than other DOM elements in React
    -   Form elements naturally keep some internal state.
    -   For example, this form in plain HTML accepts a single name:

forms
```jsx
<form>
  Full Name:
  <input name="fullname" />
  <button>Add!</button>
</form>
```

### Thinking About State

```jsx
<form>
  Full Name:
  <input name="fullname" />
  <button>Add!</button>
</form>
```

-   It’s convenient to have a JS function that
    -   handles the submission of the form _and_
    -   has access to the data the user entered.
-   The technique to get this is _controlled components_.

### Controlled Components

-   In HTML, form elements such as` <input>,` `<textarea>`, and `<select>` typically maintain their own state and update it based on user input.
-   In React, mutable state is kept in the state of components, and updated with the setter function returned from `useState()`.
	- “things that change” = state
-   How do we use React to control form input state?
	- How do we have react be in charge of the state, rather than html elements be in charge of their own state
	- Opinionated frameworks like react - one of their main beliefs is that react needs to be the single source of truth of that state

### One Source of Truth

- We make React state be the “single source of truth”
- React controls:
    - What is _shown_ (the value of the component)
    - What happens when user types _(this gets kept in state)_
- Input elements controlled in this way are called  
    _controlled components_.

### How the Controlled Form Works

-   Since handleChange runs on every keystroke and updates React state,  
    the displayed value will update as the user types.
-   Since form element’s value is set from state, its display will  
    always match, making React state the source of truth.
-   With a controlled component, every form element change has a related  
    handler function, making it easy to modify or validate user input.

### handleChange Methods

- Here are the methods that update state based on input.
```jsx nums {35-36}
function SimpleNameForm() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	
	function handleChangeFirstName(evt) {
		const firstName = evt.target.value;
		setFirstName(firstName);
	}
	
	function handleChangeLastName(evt) {
		const lastName = evt.target.value;
		setLastName(lastName);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		console.log("Submitted: ", "firstName: ", firstName, "lastName: ", lastName);
		// do something with the data submitted
	  }
	
	  return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="firstName">First:</label>
			<input
				id="firstName"
				name="firstName"
				value={firstName}
				onChange={handleChangeFirstName}
			/>
			
			<label htmlFor="lastName">Last:</label>
			<input
				id="lastName"
				name="lastName"
				// This makes react the one in charge
				value={lastName} 
				onChange={handleChangeLastName}
			/>
			<button>Add a new person!</button>
		</form>
	  )
}
```

## Accessibility: Labeling Inputs

- Good accessibility practice puts `<label>` elements in forms:
```jsx
<form>
  <label for="fullname-input">Full Name:</label>
  <input id="fullname-input" name="fullname" />
  <button>Add!</button>
</form>
```

- Our `<label>` elements have an important attribute, for
- If a for attribute matches the id of an input, clicking on that label changes focus to the input.
- But there’s a problem here!
	- react does things differently

### htmlFor instead

- *for* is a reserved word in JavaScript, just like *class*
- Just as we replaced class with *className*, we replace for with *htmlFor*
- ! You will console warnings if you forget this

```jsx
<form>
  <label htmlFor="fullname-input">Full Name:</label>
  <input id="fullname-input" name="fullname" />
  <button>Add!</button>
</form>
```

## Handling Multiple Inputs

How we’ve done this so far
```jsx
function SimpleNameForm() {
  // multiple pieces of state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // multiple handleChange functions
  function handleChangeFirstName(evt) {
    const firstName = evt.target.value;
    setFirstName(firstName);
  }

  function handleChangeLastName(evt) {
    const lastName = evt.target.value;
    setLastName(lastName);
  }
}
```

Instead, what if we have one piece of state - an object!
```jsx
{firstName: "", lastName: ""}
```

And we figure out what fields changed like this
```jsx
const fieldName = evt.target.name;
```

- To handle multiple controlled inputs:
	-   Instead of making a separate onChange handler for every single input, we can make one generic function for multiple inputs!
	- & Add HTML name attribute to each JSX input element
		- *name* attribute must match the *key* in the state object
	-   Then the handler function can determine the key in state to update  
	    based on event.target.name.
```jsx
const [formData, setFormData] = useState({
  firstName: "",
  lastName: ""
});

function handleChange(evt) {
  const fieldName = evt.target.name;
  const value = evt.target.value;

  setFormData(currData => {
    currData[fieldName] = value;
    return {...currData};
  });
}
```

- & Using this method, *keys in state* must match input *name attributes*.

demo example
```jsx nums {27,35}
function SimpleNameForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: ""
	});
	
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name]: value,
		}));
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		console.log("Submitted: ", "firstName: ", firstName, "lastName: ", lastName);
		// do something with the data submitted
	  }
	
	  return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="firstName">First:</label>
			<input
				id="firstName"
				name="firstName"
				value={formData.firstName}
				onChange={handleChangeFirstName}
			/>
			
			<label htmlFor="lastName">Last:</label>
			<input
				id="lastName"
				name="lastName"
				value={formData.lastName} 
				onChange={handleChangeLastName}
			/>
			<button>Add a new person!</button>
		</form>
	  )
}
```

## Computed Property Names

### Fancy technique

one way
```js
let fieldThatChanged = "firstName";
let newState = {...oldState};

newState[fieldThatChanged] = newValue;
```

another way
```js
let fieldThatChanged = "firstName";

let newState = {
  ...oldState,
  [fieldThatChanged]: newValue
};
```

### ES2015 Review

```jsx
let fieldThatChanged = "firstName";

let newState = {
  ...oldState,
  [fieldThatChanged]: newValue
};
```

-   ES2015 introduced a few object enhancements…
-   Including: object literals can have property names  
    dynamically determined by expressions.
-   The feature is called _computed property names_.

### Using computed property names

demo/name-form-demo/src/NameForm.js
```jsx nums {10}
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }
```

- & Remember, keys in state must match input name attributes.

## Shopping List Example

-   Parent: `ShoppingList `(manages a list of shopping items)
-   Child: `NewListItemForm` (form to add a new item to the list)

```jsx
function ShoppingList() {

  /** Add new item object to cart. */
  function addItem(item) {
    let newItem = { ...item, id: uuid() };
    setItems(items =%3E [...items, newItem]);
  }
}
```

```jsx
function NewListItemForm({ addItem }) {

  /** Send {name, quantity} to parent
   * and clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    addItem(formData);
    setFormData(initialState);
  }
}
```

### Passing Data Up to a Parent Component

- In React we generally have downward data flow:  
  *“Smart” parent components with simpler child components.*
    - But it’s common for form components to manage their own state…
    - & But smarter parent component usually has a doSomethingOnSubmit method to update its state after the form submission…
        - So: parent passes its doSomethingOnSubmit method as a prop to child.
    - Child component calls this method, updating the parent’s state.
    - Child is “dumber” — all it knows is to invoke that function with its data.
        - & Let the form just be a form

## Keys and UUIDs

-   Using iteration index as key prop is a poor idea when list changes
	- When you iterate, you need a *key* prop
-   No natural unique key? Use a library to create a _uuid_
-   Universally unique identifier (UUID) is a way to uniquely identify info
-   Install it using `npm install uuid`

### Using the UUID Module

demo/shopping-list/src/ShoppingList.js
```jsx
import { v4 as uuid } from 'uuid';
  /** Add new item object to cart. */
  function addItem(item) {
    let newItem = { ...item, id: uuid() };
    setItems(items => [...items, newItem]);
  }
```

demo/shopping-list/src/ShoppingList.js
```jsx
function renderItems() {
  return (
      <ul>
        {items.map(item => (
            <li key={item.id}>
              {item.name}: {item.qty}
            </li>
        ))}
      </ul>
  );
}
```

## Other Concepts

### Uncontrolled components

-   If React is _not_ in control of the form state, this is called an _uncontrolled component_.
-   Some inputs and external libraries require it.

### Validation

-   Useful for UI
-   **Not an alternative to server side validation**
-   [Formik](https://jaredpalmer.com/formik/docs/overview)

## Testing Forms

- To test typing in form inputs, we can use `fireEvent.change`
	- & `fireEvent.change` Simulates typing info into a form
- When using this, we’ll need to mock `evt.target.value`:  this is how we’ll tell React testing library what to place in the input
	- simplest version
- For controlled components, state will then automatically update

demo/shopping-list/src/ShoppingList.test.js
```jsx nums {12-13}
it("can add a new item", function () {
  const { getByLabelText, queryByText } = render(<ShoppingList />);

  // no items yet
  expect(queryByText("ice cream: 100")).not.toBeInTheDocument();

  const nameInput = getByLabelText("Name:");
  const qtyInput = getByLabelText("Qty:");
  const submitBtn = queryByText("Add a new item!");

  // fill out the form
  fireEvent.change(nameInput, { target: { value: "ice cream" } });
  fireEvent.change(qtyInput, { target: { value: 100 } });
  fireEvent.click(submitBtn);

  // item exists!
  expect(queryByText("ice cream: 100")).toBeInTheDocument();
});
```

## Looking Ahead

-   `useEffect`
-   AJAX with React