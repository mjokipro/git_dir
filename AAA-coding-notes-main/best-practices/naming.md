
## Re-using names
- If you have mutliple functions that use the same information, you can use the same parameter names within those functions to refer to that info
- If you have info that refers to similar, but not the same info, like “gameMasterDeck” vs “playerDeck”, you’d want to name them accordingly, not name them both “deck”
- The key is to be intentional
- Don’t `shadow` variables though:
```js

```

## filenames
- File names should be camelCase

## global-constants
- GLOBAL_CONSTANTS should be in all caps, separated by underscores
- Should be at top of file
- And have very clear names - without the context of being inside a function, it’s harder to figure out what they’re for.

## naming-objects
- Common practice is to name objects:
	- keyToValue

## naming-functions
- Function names should be verby
- Name your function to indicate distinction of if this function ‘changes the world’ (modifies other elements, sends an email, etc.) or if it just retrieves something/ does something else simple 
	- Example: Just retrieving a value:
		- getScore() is best name for retrieving a score, instead of findScore, calcScore, etc.
	- Example: Making big changes:
		- sellBook()  changes inventory of books, sends email, etc. 
		  
### async function naming
- #tip Kate - Within async functions, name the response that you get back from an API `const response`. NOT the thing you want to extract from the response (‘gif’ ‘movie’ etc.), to keep things clear and prevent yourself from getting confused. 

