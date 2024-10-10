
---
date: 2023-04-24
metadata: true
concepts: ['react', 'routing']
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Previous Review

- all about assessment

## Goals

-   Describe what client-side routing is and why it’s useful
-   Compare client-side routing to server-side routing
-   Describe how router URL parameters work
-   Learn how to test React Router components

## Server-Side Routing

-   “Server-side routing” is the traditional pattern
    -   Clicking an` <a>` link causes browser to request page & replace entire DOM
-   Server decides what HTML to return based on URL requested
- Multipage apps –> server-side routing

## Client-Side Routing

### Faking Client Side Routing

demo/nonrouted/src/App.js
```jsx
function App() {
  const [page, setPage] = useState("home");

  function goToPage(newPage) {
    setPage(newPage);
  }

  function showPage() {
    if (page === "home") return <Home />;
    if (page === "eat") return <Eat />;
    if (page === "drink") return <Drink />;
  }

  return (
    <main>
      <nav>
        <a onClick={() => goToPage("drink")}>Drink</a>
        <a onClick={() => goToPage("eat")}>Eat</a>
        <a onClick={() => goToPage("home")}>Home</a>
      </nav>
      {showPage()}
    </main>
  );
}
```

- That’s _okay_…
-   It does let us show different “pages”
    -   All in the front-end, without loading new pages from server
-   But we don’t get
	-  A different URL as we move around “pages”
	-   The ability to use the back/forward browser buttons ![⬅️|25](https://twemoji.maxcdn.com/v/14.0.2/svg/2b05.svg) ![➡️|25](https://twemoji.maxcdn.com/v/14.0.2/svg/27a1.svg) ![😭|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f62d.svg)
	-   Any way to bookmark a “page” on the site ![📖|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f4d6.svg) ![📑|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f4d1.svg) ![😱|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f631.svg)

### Real Client-Side Routing

- *React can give us real Client-Side Routing*

### Client-Side Routing: What?

-   Client-side routing handles mapping between URL bar and page user sees via _browser_ rather than via _server_.
-   Sites that exclusively use this are _single-page applications_.
-   JavaScript manipulates the URL bar with the History Web API

## React Router

To get started with React Router, install react-router-dom.
```shell
$ npx create-react-app routed
$ cd routed
$ npm install react-router-dom
```

### Including the Router

demo/routed/src/App.js
```jsx
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/drink" element={<Drink/>} />
          <Route path="/eat" element={<Eat/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
```

- Wrap the things that need routing with `<BrowserRouter>`
- There are other routers besides BrowserRouter — don’t worry about them.

- ~ Other types of routers
	- If you read through the React Router docs, you’ll see examples of other types of routers. Here’s a brief description of them:
		- **HashRouter:** this router is designed for support with older browsers that may not have access to the full history API. In such cases, you can still get single-page type functionality by inserting an anchor (#) into the URL. However, this does not provide full backwards-compatibility: for this reason, the React Router documentation recommends BrowserRouter over HashRouter if possible.
		- **MemoryRouter**: This router mocks the history API by keeping a log of the browser history in memory. This can be helpful when writing tests, since tests are typically run outside of a browser environment.
		- **NativeRouter**: This router is designed for React Native applications.
		- **StaticRouter**: This is a router that never changes location. When would you ever use this? According to the docs, “This can be useful in server-side rendering scenarios when the user isn’t actually clicking around, so the location never actually changes. Hence, the name: static. It’s also useful in simple tests when you just need to plug in a location and make assertions on the render output.”

- If you type into the url bar - this sends a get request and will render a whole new page
	- BUT links in react router (Link not a) keep user on the same page and DO NOT rerender the whole page
		- just changes the URL bar
	- `<a>`links would render a whole new page and lose js variables, etc.

## Routes and Links

### A Sample Application

App.js
```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Eat from "./Eat";
import Drink from "./Drink";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/drink" element={<Drink/>} />
          <Route path="/eat" element={<Eat/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

### Route Component

```jsx
<Route path="/eat" element={<Eat />} />
```

- Route component acts as translation service between routes & components.
    - Tell it path to look for in URL, and what to render when it finds match.
- Props you can set on a Route:
    - **path**: path that must match
    - **element** : the component to render when the route matches

### Routes Component

-   Routes finds a matching Route and renders only that.
-   Wrap all of your `<Route> `components with a `<Routes>` component

- ~ Tip: Avoid nested routes for now
	- If you look in the React Router docs, you’ll see that there are ways to nest your `<Route>` components inside of other `<Route>` components. This is a complicated design and is beyond the scope of what you will need to do in this course (and may not even be something you see at the company you work at).

## Navigation Links

### Link Component

- The `<Link>` component acts as a replacement for` <a>` tags.
	- Note: will look like `<a>` tags in the browser, but react intercepts these and just modifies url bar
- & Link must be used within a Router component (like BrowserRouter)
- Instead of an *href* attribute, `<Link>` uses a *to* prop.
- & Clicking on `<Link>` does _not_ issue a GET request.
    - & JS intercepts click and does client-side routing

link component
```jsx
<p>Go to <Link to="/drink">drinks</Link> page</p>
```

- ~ Tip: NavLink Component
	-  ` <NavLink>` is just like link, with one additional feature
	    -   If at page that link would go to, the `<a>` gets a CSS class of _active_
	        -   This lets you have CSS like this:
		```css
		.MyNavBarClass a {
		  color: white;
		}
		
		.MyNavBarClass a.active {
		  color: black;
		}
		```
-   Very helpful for navigation menus

### A Sample Navigation Bar

Nav.js
```jsx nums {2}
import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/">
        Home
      </Link>
      <Link to="/eat">
        Eat
      </Link>
      <Link to="/drink">
        Drink
      </Link>
    </nav>
  );
}

export default NavBar;
```

## URL Parameters

### An Anti-Pattern

- !! Bad: ![🤢|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f922.svg)
```jsx
function App() {
  return (
    <App>
      <Routes>
        <Route path="/food/tacos" element={<Food name="tacos" />} />
        <Route path="/food/salad" element={<Food name="salad" />} />
        <Route path="/food/sushi" element={<Food name="sushi" />} />
      </Routes>
    </App>
  );
}
```


### What’s the Problem?

- ! Lots of duplication
- What if we want to add more foods?
- $ Solution: Let’s use URL parameters!

### A Better Way

```jsx nums {12}
import React from "react";
import Nav from "./Nav";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Food from "./Food";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/food/:name" element={<Food/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
```

- Like with Express, we indicate a URL parameter with a colon `:`

### Accessing URL Parameters

- The `useParams` hook stores info on the URL parameters.
```jsx
<Route path="/food/:name" element={<Food/>} />
```

- given the above code and a url of /food/sushi
    - & the useParams hook returns an object
    - the key of the object in this example will be name
    - the value will be sushi

For the route /food/:name
```jsx
import { useParams } from "react-router-dom"

function Food() {
  const params = useParams(); // or { name } = useParams();
  return (
    <div>
      <h1>You must like { params.name }</h1>
    </div>
  );
}
```

- ~ Tip: Multiple URL Parameters
	- In that example, we only used one URL parameter.
	- It’s possible to have multiple parameters in a single route.
	- For example, to have food and beverage pairings in route:
	```jsx
	<Route path="/food/:foodName/drink/:drinkName">
	  <Food />
	</Route>
	```
	- Here, `useParams()` will return an object with two keys:  *foodName* and *drinkName*.

## Redirects

### Client-side Redirects

- With React Router we can mimic the behavior of server-side redirects.
- Useful after certain user actions (e.g. submitting a form)
- Also useful to not allow users to go somewhere (e.g. unauthorized pages)

### How to Redirect

- In React Router, there are two ways to redirect:
    - With the `useNavigate` hook
        - Useful for *“you’re now done here, go here instead, if you go back - no worries!”*
            - Form submissions: may be cases to prevent resubmissions, but generally, should be able to go back to the form (edit profile, etc.)
    - With the `Navigate` component
        - Useful for *“you shouldn’t have gotten here, go here instead, do not go back”*
            - Don’t make it a part of the history that you went here


### The useNavigate hook: An Example

- Need to import `useNavigate` from `react-router-dom`
- Useful for *“you’re now done here, go here instead, if you go back - no worries!”*

```jsx
function Contact() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate("/");
  }

  return (
    <div>
      <h1>This is the contact page.</h1>
      <p>Enter email to get in touch</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}
```

### The Navigate Component: An Example

- Need to import `Navigate` from `react-router-dom`
- Useful for *“you shouldn’t have gotten here, go here instead, do not go back”*

demo/redirects/src/AdminPage.js
```jsx
function AdminPage() {

  const { username } = useParams();

  if (username !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Welcome back admin!</h1>
      <Link to="/">Go home</Link>
    </div>
  );
}
```

- ~ Note: History API
	- All client-side routing libraries use the browser’s history API
	- History API allows us to manipulate browser history via JS
	- Common API methods on `window.history`:
	    - `.back`: go back one page in history
	    -  `.forward:` go forward one page in history
	    - `.go`: go to an arbitrary page in history
	    - `.pushState`: add new entry in history & update URL _without_ reloading page.
	    - `.replaceState` - without adding new entry in history, update URL _without_ reloading page.
	- The function signatures for back, forward, and go are all relatively straightforward. The first two functions don’t take any parameters; the third accepts one parameter, indicating how far back or forward in the session history you’d like to travel.
	- On the other hand, If you read about the history API on MDN, you’ll see that the signature for `pushState` and `replaceState` are a little… weird. Both accept three parameters: a state object, a title and a url. Let’s describe these in reverse order:
		- `url` is simply the new URL you want to put into the URL bar.
		- `title` parameter is, strangely, ignored by every browser. You can supply a string here if you want, but it does not matter.
		- `state` parameter is an object that you can potentially access later if the user navigates back to this point in the session history by clicking back or forward. Practically speaking, this isn’t something you need to worry about for now.
	- While these function signatures can definitely be confusing, most times you can ignore the first and second parameters: the most important is the third.
	- For more on the history API in general, check out [MDN on History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)

## Including a 404

```jsx nums {9}
function Routes404() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog/:slug" element={<Post/>} />
      <Route path="/blog" element={<BlogHome/>} />
      <Route path="/"  element={<Home/>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
```

- ~ Note: 404s with a Navigate component
	- Instead of a component we could also use a `<Navigate>` component!
	```jsx
	function RoutesList() {
	  return (
	    <Routes>
	      <Route path="/about" element={<About />} />
	      <Route path="/contact" element={<Contact />} />
	      <Route path="/users/:username" element={<AdminPage />} />
	      <Route path="/blog/:slug" element={<Post />} />
	      <Route path="/blog" element={<BlogHome />} />
	      <Route path="/" element={<Home />} />
	      <Route path="*" element={<Navigate to="/" />} />
	    </Routes>
	  );
	}
	```

## SPA vs MPA

- Single page apps:
	- harder to build
	- better for moving btwn parts of related things
	- when things feel like one app - example: google maps
- Multipage apps:
	- easier to build
	- better for when information is very different between pages
- There are many examples of in-between cases using both on a website

## Testing React Router

### Testing Components with React Router

- Components rendered by router are harder to test than regular components:
- Components may depend on router hooks we’ll have to mock:
    -   eg, `useParams` hook
- Components require knowledge of the parent router during the test

### Testing React Router

- Consider our *Nav* component:

demo/redirects/src/Nav.js
```jsx
function Nav() {
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/blog">Blog</Link></li>
      <li><Link to="/blargh">Broken Link</Link></li>
    </ul>
  );
}
// end
```

### Router Context Errors

- Problems arise when we `render()` the component:
```jsx
it('renders without crashing', function() {
  render(<Nav />);
});
```

You will get something like:
```
To avoid *Error: Uncaught [Error: useHref() may be used only in the context of a <Router> component.]*, use a mock router, `MemoryRouter`, which is designed for tests:
```

### MemoryRouter

```
To avoid *Error: Uncaught [Error: useHref() may be used only in the context of a <Router> component.]*, use a mock router, `MemoryRouter`, which is designed for tests:
```
- & Need to import MemoryRouter
	- Need to wrap in a router b/c Nav uses Link
```jsx
import { MemoryRouter } from 'react-router-dom';
```

demo/redirects/src/Nav.test.js
```jsx
// full render
it('mounts without crashing', function () {
  const { getByText } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );

  const blogLink = getByText(/Blog/i);
  expect(blogLink).toBeInTheDocument();
});
```

![🎉|25](https://twemoji.maxcdn.com/v/14.0.2/svg/1f389.svg)

### Testing individual routes

- To test your specific routes, use the `initialEntries` prop on MemoryRouter to “navigate” to a route
	- Allows you to look at something from a specific url
		- most times will pass 1 arg - the url you want to be at
	- Can test looking at nav bar *as if* you were in the about page, etc.
	- Or test that you are seeing expecting things on that page


demo/redirects/src/RoutesList.test.js
```jsx
it('renders the about page', function () {
  const { debug, getByText } = render(
    <MemoryRouter initialEntries={["/about"]}>
      <RoutesList />
    </MemoryRouter>
  );

  const h1Text = getByText(/This is the about page./i);
  expect(h1Text).toBeInTheDocument();
});

it('renders the blog page', function () {
  const { debug, container } = render(
    <MemoryRouter initialEntries={["/blog"]}>
      <RoutesList />
    </MemoryRouter>
  );

  const links = container.querySelectorAll("li a")
  expect(links).toHaveLength(3)
});
```

- If you want to explicitly mock `useParams`, here is what that might look like. This can be helpful when unit testing an individual component instead of the entire `<Routes> `component with initialEntries.

```jsx
// Make sure that this is OUTSIDE of your test or describe block

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ name: "burrito"}),
}))
```

## Patterns in React Router

-   There aren’t strong standards about how to best use React Router
-   Here are patterns _we_ follow for React Router
-   Some of these have been mentioned already—here they are in one place

### Consider a single RoutesList.js file

-   Don’t spread` <Route>` components across multiple files
-   You can put all `<Route>`s directly in your App
-   When you have many, it may be overwhelming
    -   Having a place for all routing info may be preferable
    -   May be easier to debug
    -   Make a file, RoutesList.js, with a RoutesList component

### Avoid nested routes

-   Components rendered by a Route can themselves render Route components
-   An example of nested routing, and is generally confusing and error prone
-   Unless you need it, don’t nest your routes!
    -   You’ll often end up with spaghetti code and a headache

## React Router Tips

### React Router Tips (Overview)

-   Favor Route child components over other options
-   Keep routes up high in the component hierarchy with a `<Routes>` component
-   Avoid nested routes
-   Use the `<Navigate>` component and useNavigate for redirecting