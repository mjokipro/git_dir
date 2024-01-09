- Destructuring is a constant-time operation, since it is just an assignment of value(s)

## Array-Destructuring
- Shorthand way to pull information out of arrays and create variables with associated values
```js
const hobbies = ['teaching', 'music', 'hiking', 'art'];

const [first, second, ...others] = hobbies;

console.log(first);   // 'teaching'
console.log(second);  // 'music'
console.log(others);  // ['hiking', 'art']
```
- You can use array destructuring to do a fancy swap on 1-line.
	- With this, you can switch the values of two variables without making a third “temp” variable.
```js
let a = 1;
let b = 3;

[a, b] = [b, a];

console.log(a); // 3
console.log(b); // 1
```

- This also applies to larger arrays:
```js
const uniques = [2, 5, 11, 7, 8, 4, 15];

// ... mult pointer logic on an almost sorted array ...

uniques[leftPointer], uniques[rightPointer]] = [uniques[rightPointer], uniques[leftPointer]];
```

## Object-Destructuring
- Shorthand way to pull info out of objects and create variables with their associated values
```js
const userData = {
  username: 'janet',
  id: 12345,
  firstName: 'Janet',
  lastName: 'Cho',
  age: 34,
};

// declare variables: username, firstName, lastName, id
//   values taken from the keys of the same name in userData

const { username, firstName, lastName, id } = userData;
console.log(username);  // janet
console.log(id);        // 12345
```

### Can also use destructuring with spread operator
```js
const userData = {
  username: 'janet',
  id: 12345,
  firstName: 'Janet',
  lastName: 'Cho',
  age: 34,
};

// extract the password key; collect the rest in 'user'
const { id, ...user } = userData;

console.log(user);
//  {
//    username: 'janet',
//    firstName: 'Janet',
//    lastName: 'Cho',
//    age: 34,
//  }
```
