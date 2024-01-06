### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
  React is a framework that deals with the front end of an application.  It helps create fast, flexible, powerful front ends through modularization, and separation of concerns for any aspect of a website(front end wise).  You would use it whenever you want a more robust user interface.

- What is Babel?
  A transpiler, meaning it takes modern javascript code, and turns it into an archaic, wizard language that has long been vanished by the ECMA council elders.

- What is JSX?
  Javascript, but with react influence.  You can have your functions render html, without having to go the whole createElement, ElementText, etc.

- How is a Component created in React?
  Like a regular function.  The return statement is where the HTML part goes.

- What are some difference between state and props?
  State is a piece of data that is consumed by components.  Props can be any data/data-type that is passed down to components from a parent component, or through a store(redux) dispatch.

- What does "downward data flow" refer to in React?
  This refers to the fact that if you have a component with a lineage(parent-->child-->grandchild-->great-grandchild), you have to "drill" down to each layer if you want to pass data from the parent to the grandchild.

- What is a controlled component?
  A controlled component is one that handles form data itself, either through hooks, or a callback function passed down by its parent.

- What is an uncontrolled component?
  An uncontrolled component is when form data is not handled by the components, but through the DOM itself.

- What is the purpose of the `key` prop when rendering a list of components?
  It helps react keep track of components rendered from each other, especially from the result of a list.

- Why is using an array index a poor choice for a `key` prop when rendering a list of components?
  This can have unexpected side effects, as it refers to the index being given.  If it happens to be moved around, the index can change, which is not something you might want, as it can update the component in unusual ways.

- Describe useEffect.  What use cases is it used for in React components?
  UseEffect is a hook that runs at least once, when the component renders.  It then runs again, if a dependency has been passed down to it, and it has updated its data.  useEffect will compare the dependency to the new one, and if it is different, it will run again.

- What does useRef do?  Does a change to a ref value cause a rerender of a component? 
  It's a hook that is called, when you want a variable to persist through changes/re-renders.  It does not cause a re-render if the variable changes.

- When would you use a ref? When wouldn't you use one?
  When you have a variable that you want to keep across the application, and don't want it to lose its value after a conponent rerenders.
  You wouldn't want to use it if you want your application to have dynamic data.

- What is a custom hook in React? When would you want to write one?
  Custom hooks are functions that take in a value, and return an array, the value and a way to update it. 
  You use custom hooks to DRY up your React code, best to abstract commonly repeated actions(IE fetching data, updating a variable, etc.)
