-   JSON is a string that looks like a JS object

#refactor 

### JSON
- JSON stands for **JavaScript Object Notation**.
- JSON looks similar to JS objects, but all the keys must be “double-quoted”.

```json
{
  "person": {
    "name": "Elie",
    "favoriteColor": "purple",
    "city": "San Francisco",
    "favoriteNumber": -97,
    "interests": ["CEOing", "eating Mediterranean food"],
    "futureDreams": null
  }
}
```

- A JSON payload must be sent as a string over HTTP requests.
- To convert JavaScript object to JSON string:
```
JSON.stringify(myObject)   // "...string of JSON..."
```

To convert JSON string to JavaScript object:
```
JSON.parse(jsonString)   // {prop: value, ...}
```

Most libraries do this for you.

## JSON
### Storing Local Data
- localStorage at it’s source only supports storing strings
- Thus, need to store array data as a string to be useful.
	- Use JSON stringify
```js
const user = {
	name: 'Andrew',
	age: 27
}

const userJSON = JSON.stringify(user);
console.log(userJSON);
```
- Must always use double quotes with JSON
	- But never going to be directly writing JSON, so it’s okay to use single quotes in your object
### Using Local Data
- To retrieve stringified data from localStorage:
	- use JSON parse

```js
const userJSON = localStorage.getItem("user");
const user = JSON.parse(userJSON);
console.log(`${user.name} is ${user.age}`);
```


