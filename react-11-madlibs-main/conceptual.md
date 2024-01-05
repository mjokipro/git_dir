### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
  React is an open-source JavaScript library used for building user interfaces. It's often used for single-page applications and complex web interfaces

- What is Babel?
  Babel is a JavaScript compiler that allows developers to write code in the latest ECMAScript standards. It transpiles modern JavaScript code into backward-compatible versions, making it a crucial tool for maintaining cross-browser compatibility.

- What is JSX?
  JSX (JavaScript XML) is a syntax extension for JavaScript used in React to describe the structure and content of UI components. It allows developers to write HTML-like code within JavaScript

- How is a Component created in React?
  In React, you create a component by defining a JavaScript function or class that returns JSX code, which describes the component's UI
- What are some difference between state and props?
  State is used for managing data that can change within a component and is controlled by that component.
  Props are used for passing data from a parent component to its child components

- What does "downward data flow" refer to in React?
  Downward data flow" in React means that data should be passed from parent components to child components through props
- What is a controlled component?
  A controlled component is an input element that maintains its state in the component's state property

- What is an uncontrolled component?
  An uncontrolled component is an input element whose value is not controlled by React's state, it relies on the DOM for its state management
- What is the purpose of the `key` prop when rendering a list of components?
  The key prop is used to give each element in a list a unique identifier
- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
  it can lead to unexpected behavior when items in the list are added, removed, or reordered. It's important to use a stable and unique identifier

- Describe useEffect. What use cases is it used for in React components?
  useEffect is a hook in React used for handling side effects in functional components. It allows you to perform actions such as data fetching, DOM manipulation
  some use cases include making network requests, setting up and cleaning up event listeners

- What does useRef do? Does a change to a ref value cause a rerender of a component?
  useRef is a hook that creates a mutable ref object, which can be used to hold a reference to a DOM element or any other mutable value

- When would you use a ref? When wouldn't you use one?
  we would use a ref when you need to interact with a DOM element directly, manage focus, or persist values across renders without causing rerenders. You wouldn't use a ref for managing component state or data that should trigger component rerenders

- What is a custom hook in React? When would you want to write one?
  A custom hook is a JavaScript function that starts with the prefix "use" and can encapsulate reusable logic. We would write a custom hook when we have a piece of logic that is used in multiple components, allowing us to abstract and share that logic across different parts of our application
