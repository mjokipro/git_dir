## Dot vs Bracket notation
- Advantages of dot notation: 
	- code editors will light up with colors when using dot notation
	- tends to be popular w/engineers - and you want to match the code around you

## Spread operator with Objects
```js
//declare function takes obj, add prop, returns obj
const testObject = {};
const newObj = addColor(testObject); // {color: "orange"}

function addColor(obj){
	const newObj = {...obj};
	newObj['color'] = "orange";
return newObj;
}
```

## Object shorthand
- When key name is the same as variable holding the desired value, you don’t have to repeat them
```js
const firstName = "Spencer";
const lastName = "Armini";

// Instead of this:
const developer = {
  firstName: firstName,  
  lastName: lastName,
}

// Can do this:
const developer = {
  firstName,
  lastName,
}
```

## Object methods
- A nice shorthand when a key in an object represents a function.
```js
// Instead of this:
const instructor = {
  sayHello: function () {
    return "Hello!";
  }
}

// Can do this:
const instructor = {
  sayHello() {
    return "Hello!";
  }
}
```

## Object-Destructuring
- Read more about destructuring [here](array-object-destructuring)
- Note: there is also [array destructuring](arrays#Array-Destructuring) 
