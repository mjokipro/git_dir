### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it? frontend js software, use when need to break into modular components.

- What is Babel? js translator, used to translate jsx

- What is JSX? javascript xml

- How is a Component created in React? in a file and imported

- What are some difference between state and props? state is the local components changable state and props are the methods used to change them

- What does "downward data flow" refer to in React? state and prop transfer to their components (parent to child), and the components call the parent's methods to update the state. unidirectional

- What is a controlled component? React’s Controlled Components manage form data via component state, receiving values through props and updating through callbacks like onChange. The parent component maintains the state, passing updated values as props to the controlled component.

- What is an uncontrolled component?Uncontrolled Components are the components that are not controlled by the React state and are handled by the DOM (Document Object Model). So in order to access any value that has been entered we take the help of refs.

- What is the purpose of the `key` prop when rendering a list of components? to have unique id for react to have key for value

- Why is using an array index a poor choice for a `key` prop when rendering a list of components? arrays are sequential and would have gaps

- Describe useEffect.  What use cases is it used for in React components? React JS useEffect hooks is a predefined hook that handles the effects of the dependency array. It is called every time any state in the dependency array is modified or updated

- What does useRef do?  Does a change to a ref value cause a rerender of a component? The useRef is a hook that allows to directly create a reference to the DOM element in the functional component. useRef hooks preserve value across various re-renders and do not cause re-renders whenever a value is changed. use for focuschange

- When would you use a ref? When wouldn't you use one? use when must use vanilla js

- What is a custom hook in React? When would you want to write one? a way to incorporate a custom function for state
