### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
>JavaScript framework. Using React, you can build complex UI interactions that communicate with the server in record time with JavaScript-driven pages
- What is Babel?
>Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.
- What is JSX?
> JSX stands for JavaScript XML. JSX allows us to write HTML in React. JSX makes it easier to write and add HTML in React.
- How is a Component created in React?
>Every React. js component acts separately, so you can change one section of the app without needing to update everything. This also means you can use the same component in each area of the app and change the individual pieces. There's less to update, so it makes the entire process far more efficient.
- What are some difference between state and props?
> state is mutable props are not
- What does "downward data flow" refer to in React?
>passing state to children as props or custom hooks
- What is a controlled component?
>​ In React, a controlled component is a component that is controlled by React state, while an uncontrolled component is a component that maintains its own internal state. A controlled component receives its current value and an update callback via props, and the parent component manages the state of the component.
- What is an uncontrolled component?
>component that maintains its own internal state
- What is the purpose of the `key` prop when rendering a list of components?
>A key is a special string attribute you should include when creating arrays of elements. Key prop helps React identify which items have changed, are added, or are removed.
- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
> array is mutable therefore the index of the component could change, react would not render original component in this case as reference has changed
- Describe useEffect.  What use cases is it used for in React components?
>The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers. useEffect accepts two arguments. The second argument is optional.
- What does useRef do?  Does a change to a ref value cause a rerender of a component?
>The useRef Hook allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated. It can be used to access a DOM element directly.
- When would you use a ref? When wouldn't you use one?
>when you need to access a dom method that isn't accessible via react methods. - like custom focus
- What is a custom hook in React? When would you want to write one?
>A custom hook is a special JavaScript function whose name starts with 'use' and can be used to call other hooks. You could use this to generalize ajax calls, forms / fields in react, creating a piece of state, or a useEffect and have access to such methods accross components. this eliminates uneccessary code repetition.