### Conceptual Exercise

Answer the following questions below:

- What is the purpose of the React Router?
  To act as a serverless "server".  It uses the window.history object to *route*
  different pages and act as if it was a server.

- What is a single page application?
  A react application that uses only the front end to handle all aspects of the page.
  Usually very data driven, and change based on user input. Rely on client side 
  routing.

- What are some differences between client side and server side routing?
  client-side is mainly focused on displaying data, and avoiding calls to the back-end.  All pages
  are immediately accessed, and theres not need to get responses or download data from a back end.
  The server side route is based on handshakes and downloading resources, accessing databases, 
  and getting user responses that are handled away from them.

- What are two ways of handling redirects with React Router? When would you use each?
  You can redirect to, and redirect from.  If you want to show a user a page after completing an action,
  you would do redirect to.  If you are making some changes that requires a page change but no action,
  redirect from is best.

- What are two different ways to handle page-not-found user experiences using React Router? 
  You can have a standard 404 template that is rendered if no route matches.  You can also redirect to a home
  page, and avoid ever showing a 404 message.

- How do you grab URL parameters from within a component using React Router?
  You can use the *useParams* method. 

- What is context in React? When would you use it?
  A way to manage state outside of components.  Helps avoid prop drilling.
  You want to use it when you want a piece of state to be accessed by a variety of components that
  may or may not be directly related.

- Describe some differences between class-based components and function
  components in React.
  Class based components have different rendereing methods(onrender, onmount, unmount, etc.).
  The class based components also have a more obtuse way of handling state changes.
  Functional components are more versatile, and easier to split up.  They have simpler API functions
  that help manage state and other react aspects.

- What are some of the problems that hooks were designed to solve?
  Hooks were designed to solve state issues, the *context* of **this**.
  They also help minimize the need tor all the class based mounting methods.
  