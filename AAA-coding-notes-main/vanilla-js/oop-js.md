
## Prototypal Inheritance
### Constructor Functions
 - & Constructor function always runs on instantiation
- Constructor function always returns undefined
#### Javascript specific
- Constructor functions that get used with the new operator
	- Any method that has the name “constructor” will be used to create new instances
- Construction functions in JS have a `prototype` property
	- `prototype` is an object
	- Put everything that you want to share with instances of the constructor function on this object
	- Typically store methods, since it is most useful. (not very useful to store static data here)
	- Important to use <u>function declaration</u> for creating a prototype method, in order to access the `this` object.
		- HOWEVER, if <u>callback function</u> is used <u>within</u> the prototype method, you’ll want to use a <u>function expression</u> (arrow function) in this case, in order to use the `this` object. Because arrow functions do <u>not</u> bind the `this` object, it therefore uses whatever `this` object it’s parent has. If a function declaration was used here instead, and the `this` object was bound in this callback function, it would be bound to a new empty `this` object, instead of the constructor/parent `this`.
			- For an example of this used, see the callback function used within `forEach()` within `getBio()` below. An arrow function is used within `forEach()` that allows access to the `firstName` property on the parent’s `this` object. This would break if a function declaration was used as the callback within `forEach()`.
	- All changes to the prototype object are reflected in all instances, <u>even if the change was made after creation of the instance</u> 
		- & This is different from other languages
```js
// Constructor Function
const Person = function (firstName, lastName, age, likes) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.likes = likes;
}

// Constructor Prototype
Person.prototype.getBio = function () {
	let bio = `${this.firstName} is ${this.age}.`
	this.likes.forEach((like) => {
		bio += ` ${this.firstName} likes ${like}.`
	});
	return bio;
}

Person.prototype.setName = function (fullName) {
	const names = fullName.split(" ");
	this.firstName = names[0];
	this.lastName = names[1];
}
```

### Static methods
- Static methods are methods that cannot be invoked on an instance, but are invoked on the Class itself in JS
- Static methods may also function as “factory” methods, creating instances of the Class they’re on
- Static methods are used for functions that are about the idea of the method, not the instance itself
	- for example, with a Class Cat, it is about Cats themselves, not ‘fluffy’

### Instance
- The object that is created from a constructor function 
  (usually from using the `new` operator)
- Also has a prototype property
	- Internal use only - not seen on the object directly
	- Upon creation, the instance prototype is assigned the value of the constructor prototype
```js
// Instantiation
const person1 = new Person('Clancey', 'Turner', 54, ['biking', 'cooking']);
	// person1.[[prototype]] = Person.prototype 
```

### Using properties & methods on an Instance
- When using a property or calling a method on an instance, Javascript:
1. First looks at the instance object for that info.
2. If it doesn’t find it, it looks up the prototype chain to the parent object and looks for that info.
3. This continues, either returning the info or if it doesn’t find it, returning undefined.
```js
console.log(person1.firstName); // 'Clancey'
console.log(person1.getBio()); // 'Clancey is 54. Clancey likes biking. Clancey likes cooking.'
console.log(person1.middleName); // undefined
```


## Inheritance with built-in Objects & Primitives
- Built-in objects use the prototype chain to access object methods
	-  Object:       myObject —> Object.prototype —> null
- Arrays and Functions are just special types of Javascript Objects
	- Array:          myArray —> Array.prototype —> Object.prototype —> null
	- Function:    myFunc —> Function.prototype —> Object.prototype —> null
- Primitive values in Javascript: string, number, boolean, null, undefined 
	- null, undefined  are truly primitive objects
	- string, number, boolean have Object wrappers — when methods are used on these primitives, javascript converts it to it’s String/Number/Boolean object counterpart
		- String:    myString —> String.prototype —> Object.prototype —> null
		- Number: myNum —> Number.prototype —> Object.prototype —> null
		- Boolean: myBool —> Boolean.prototype —> Object.prototype —> null


## Classes
- Syntatic sugar - works the same under the hood as above, just neater
```js
class Person {  
	constructor(firstName, lastName, age, likes) {
	this.firstName = firstName;
	this.lastName = lastName;
	this.age = age;
	this.likes = likes;
	}
	 
	getBio() {
		let bio = `${this.firstName} is ${this.age}.`
		this.likes.forEach((like) => {
			bio += ` ${this.firstName} likes ${like}.`
		});
		return bio;
	}
	
	setName(fullName) {
		const names = fullName.split(" ");
		this.firstName = names[0];
		this.lastName = names[1];
	}
}
```

### Inheritance & Subclassing
- Inheritance and subclassing allows for a hierarchical organization without repeating code
- Use `extends` to create subclass from a parent/superclass
- Use `super` for properties that are the same between parent/child class, and then define any unique properties to the subclass
	- & If a subclass also has it’s own constructor, it MUST call the parent’s super first within it’s own constructor. 
	- This is good - if Spencer is VP of Triangles (parent class) and Matt is expert on ShyTriangles, and Matt needs to add property to constructor for ShyTriangles — JS says “Hey Matt, you aren’t in charge of all Triangles, so you need to call Triangle constructor first (using super)”
- % Note: If you are wanting to “remove” a property/method of a subclass that is coming from a parent. This isn’t possible, and we don’t really want it to be. Subclasses should truly be a part of their parent, so if this is something that you are wanting to do, you likely have a design problem.
- % Note: you may override a parent’s prop/method completely, but you want to do this thoughtfully and intentionally to that property/method’s purpose. Don’t have that function do something completely different or unexpected.
```js
class Employee extends Person {  
	constructor(firstName, lastName, age, position, likes) {
		super(firstName, lastName, age, likes);
		this.position = position;
	}
	
	getBio() {}
}

const me = new Employee("Andrew", "Mead", 27, "Teacher", ["Teaching", "Biking"]);
```
- You can also use `super` within methods, to avoid repeating pieces of code:
```js
class Triangle {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  getArea() {
    return (this.a * this.b) / 2;
  }

  getHypotenuse() {
    return Math.sqrt(
        this.a ** 2 + this.b ** 2);
  }

  describe() {
    return `Area is ${this.getArea()}.`;
  }
}

class ColorTriangle extends Triangle {   // NOTE WITHIN SUBCLASS
  constructor(a, b, color) {
    // call parent constructor w/(a, b)
    super(a, b);                         // super used with properties
    this.color = color;  
  }

  // "inherits" getArea, getHypotenuse

  // "override" describe() w/new version

  describe() {
    return super.describe() +            // super used with method
    ` Color is ${this.color}!`;
  }
}
```

#### Multi-level inheritance
- It is possible to subclass a subclass, making a kind of hierarchy. This allows for more complex organization

![[OOP-1677164102814.jpeg]]

## Getters & Setters
- Option to get info or set info within a property
- #add

## Private vs Public Class Methods
- True for all languages, not just javascript
- Public methods can be invoked anywhere, no restrictions
- Private methods are internal to the implementation of the class, and are intended to only be called on by other instance methods of the class or subclasses.
	- Though there isn’t built in protection to truly keep these private in js, the indication of a private method is an indication to the user of a class that this was not intended for outside use.
	- & Private methods are indicated by a leading underscore
```js
class ExampleClass {
	constructor (name) {
		this.name = name;
	}

	_privateMethod() {
		console.log("I'm a private method not intended for outside use");
	}
}
```
- Protected class method #add 
```js

```
Goal of this is to privent developers from doing this:
![[OOP-1674307990055.jpeg]]