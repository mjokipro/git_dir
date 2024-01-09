
---
date: 2023-04-25
metadata: true
concepts: ['react', 'useEffect']
status: 'pre-lecture'
docs: 
cite: ['rithm']
---

## Previous review

- & Component function cannot return undefined - this will crash the app. must return:
	- one component
	- array of components
	- null
- Common for forms to handle their own state for handleChange, but for handleSubmit, common for parent to pass callback down that form calls upon submit

## Goals

-   Understand more about how rendering and state interact
-   Learn how to have “side effects” in a React app
-   See lots of examples of useEffect

## Rendering and State

- When your component calls a state setter function, when does the state change?
	- After the component re-renders
	- & State remains the same until *after* component rerenders
- Let’s find out with `<RenderDemo />`!
- A recap:
	-   A state setter function is called
	-   Your code finishes running
	-   The component re-renders
	-   In this re-render, state will be set to the new value
- Can we do something _after_ a render or re-render?
- We can! These are called _side-effects_ or _effects_


### Rendering and Effects

- This is what _effects_ are for — doing after (& unrelated to) a render
- & This is useful for different kinds of things:
	- Changing parts of the DOM not covered by React
	- Async operations, like AJAX requests *when a component is mounted*
		- When an instance of a component is rendered for the first time  = it is *mounted*
	- Doing things when a component is about to be _unmounted_
- & Effects are used for *“side-effects”*: doing things unrelated to render

## useEffect

- import `useEffect` from react
	- hook: function we get to use that lets us hook in and use some react functionality
	- functions that add functionality to react
- To use an effect, register it with `useEffect(fn)`:
- & `useEffect` always takes a callback function
	- Can take 2 args

register mySideEffect:
```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  function myEffect() {
    // ... do something
  }

  useEffect(myEffect);

  // rest of component
}
```

common to inline these:
```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(function myEffect() {
      // ... do something
    }
  );

  // rest of component
}
```

within a component:
```jsx
function MyComponent() {
  useEffect(function myEffect() {
      // ... do something
    }
  );

  // rest of component
}
```

- & my effect *always* runs _after_ first render
	- by default, my effect runs _after_ all re-renders
- my effect can do whatever you need
    - if it sets state, another render will be triggered
        - and my effect will run _after_ that re-render
        - ! (so watch out for infinite loop of rendering)

### 2nd Argument to useEffect

- `useEffect(myCallbackFn);`
    - Runs myCallbackFn effect after _every_ render
- `useEffect(myCallbackFn, [productId, userId])`
    - Runs myCallbackFn effect *only if productId <u>or</u> userId vars changed*
        - Runs if *any* variables in that list change
- `useEffect(myCallbackFn, [ ])`
    - Runs myCallbackFn effect *only the first time* (on _mount_)
        - Not much different from above example: just have no changes you’re watching for

- ~ Note: Changing Non-React DOM After State Change
	- A less common use of effects is when you need to change a Non-React part of the DOM after a state change.
	- Below is an example where an effect is used to update the title of a browser tab in response to a state change.
	  
	demo/effects/src/EffectExample.js
	```jsx nums {1, 8-10, }
	import React, { useState, useEffect } from "react";
	
	/** Demo of a simple effect: changes doc title */
	
	function EffectExample() {
	  const [num, setNum] = useState(0);
	
	  useEffect(function setTitleOnRerender() {
	    document.title = `WOW${"!".repeat(num)}`;
	  }, [num]);
	
	  function increment(evt) {
	    setNum(n => n + 1);
	  }
	
	  return (
	      <button onClick={increment}>Get More Excited!</button>
	  );
	}
	```

## Making AJAX requests when events occur

### Example: Fetching a quote on click

- You may remember seeing something like this in the Prøductïv exercise!

demo/effects/src/QuoteFetch.js
```jsx
function QuoteFetcher() {

  const [quote, setQuote] = useState({text: "", author: ""});

  async function fetchAndSetQuote() {
    const response = await axios.get(RANDOM_QUOTE_URL);
    const randomQuote = response.data.quote;
    setQuote(randomQuote);
  }

  return (
    <div>
      <button onClick={fetchAndSetQuote}>Get Quote Using handler</button>
      <h1>{quote.text}</h1>
      <h2>{quote.author}</h2>
    </div>
  );
}
```

- Nothing wrong with above code - when you click a button and fetch some info
- But for cases when:
	- What happens if we want to fetch data when the component is first mounted?

## Fetching Data on Initial Render

### Use: Getting Data via AJAX on mount

- “When a component renders, fetch data from an API”
    - Data fetching is asynchronous, and may take a moment to complete
    - Want to show user something, like a loading message, while fetching
- To fetch correctly:
    - Have an effect that runs only once
    - Inside effect, when API calls is finished, will set state & re-render

demo/effects/src/ProfileViewer.js
```jsx nums {7-8, 15}
function ProfileViewer() {
  const [profile, setProfile] = useState({
    data: null,
    isLoading: true
  });

  useEffect(function fetchUserWhenMounted() {
    async function fetchUser() {
      const userResult = await axios.get(URL);
      setProfile({
        data: userResult.data,
        isLoading: false
      });
    }
    fetchUser();
  }, [ ]);

  if (profile.isLoading) return <i>Loading...</i>;

  return (
      <div>
        <b>{profile.data.name}</b>
      </div>
  );
}
```

- & Callback for useEffect cannot be async function itself
- We solve that by:
    - _Defining_ async fn in it (lines 8-14)
    - _Calling_ that async fn (line 15)
- Change state with response

- ~ Note: Handling Errors
	- This example is very simple, and doesn’t do anything helpful if a network error happens.
	- A common pattern would be to have a piece of state for errors raised by the AJAX call, and this will be set if an error is thrown.
	- It’s also common to have a specific piece of state to show that the component is currently loading data.
	```jsx nums {4-5, 17, 20-21, 29}
	function ProfileViewer() {
	  const [profile, setProfile] = useState({
	    data: null,
	    isLoading: true,
	    errors: null,
	  });
	
	  useEffect(function fetchUserWhenMounted() {
	    async function fetchUser() {
	      try {
	        const userResult = await axios.get(URL);
	        setProfile({
	          data: userResult.data,
	          isLoading: false,
	          errors: null,
	        });
	      } catch (err) {
	        setProfile({
	          data: null,
	          isLoading: false,
	          errors: err,
	        });
	      }
	    }
	    fetchUser();
	  }, []);
	
	  if (profile.isLoading) return <i>Loading...</i>
	  else if (profile.error) return <b>Oh no! {error}</b>
	  return ( <div>... stuff using data ...</div> )
	}
	```

## Updating After Dependency Changes

### Updating Data

- Goal: Fetch data for user when form changes

### Example: Text Search

demo/effects/src/ProfileViewerWithSearch.js
```jsx nums {7, 11}
function ProfileViewerWithSearch() {
  const [username, setUsername] = useState("elie");
  const [profile, setProfile] = useState({data: null, isLoading: true});

  useEffect(function fetchUserOnUsernameChange() {
    async function fetchUser() {
      const userResult = await axios.get(`${BASE_URL}/${username}`);
      setProfile({data: userResult.data, isLoading: false});
    }
    fetchUser();
  }, [username]);

  function search(username) {
    setProfile({data: null, isLoading: true});
    setUsername(username);
  }

  if (profile.isLoading) return <i>Loading...</i>

  return (
      <div>
        <ProfileSearchForm search={search} />
        <b>{profile.data.name}</b>
      </div>
  );
}

```

## Cleaning Up an Effect

- Some effects will do something that needs to be cleaned up later:
	- removing a registered event listener
	- clearing `setInterval `or `setTimeout `usages
	- disconnecting from a web socket
- If you provide a clean up method, it will be run:
	- Before the next call of that effect (if any)
	- Before the component _unmounts_ (is removed from DOM)
- The function is provided the same state as the previous effect got when it was running. This allows you to “clean up” things that happened there.

- To do this, we return a function from useEffect!
```jsx nums {9}
useEffect(function myEffect() {
  // runs on the first render and all times after
  // because we didn't pass in an array as a 2nd arg!
  console.log('Effect ran!');

  // if we return clean up function, it runs:
  // - before effect runs again
  // - also: before component unmounts
  return function cleanUp() { console.log('Cleanup phase!'); }
})
```

- Using a cleanup
demo/effects/src/MoveBox.js
```jsx nums {8-10}
function MoveBox() {
  const [left, setLeft] = useState(0);

  useEffect(function registerKeyListener() {
    console.log("USE-EFFECT: adding event listener");
    window.addEventListener("keydown", handleKey);

    return function unmount() {
      console.log("UNMOUNTING: removing event listener");
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  /** Handle keypress & if space, move. */
  function handleKey(evt) {
    if (evt.key === " ") setLeft(v => v + 5);
  }

  return (
      <div className="innerbox" style={{marginLeft: left}}/>
  );

}
```

- Clean up function has access to previous variables
- Inside of your cleanup function, any variables have the values from when the effect that provided that cleanup function ran. So, this may not always be the up-to-date information held by your component. 
	- This is intended: this function might need the previous data, so it can clean up from that state.

## Effects Wrapup

-   Calling a state setter function triggers a re-render and you have the new value of state on that re-render
-   Effects run after re-render to do stuff not related to rendering
-   Effect can run:
    -   After every render _(no dependency list given)_
    -   After first render _(empty dependency list given)_
    -   When any dependency in list changes

-   Components cannot be async functions nor can useEffect callbacks
    -   You **can** however create async functions inside of your components and use them as callbacks (event handlers)
    -   But useEffect callbacks can _call_ async functions


## Yellow-squibbly

- // TODO: add handle to watch list above. Whenever referencing params/state
// likely should have in dependency, then use conditional logic on line 47 to
// only run fetchCompany if (some condition) is met.


