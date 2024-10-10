
---
date: 2023-05-01
metadata: true
concepts: ['typescript', 'react']
status: 'pre-lecture'
docs: 
		"React-Typescript-Cheatsheet": "https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/"
cite: ['rithm']
---

## Goals

-   Review interfaces and learn when to use them
-   Learn to use TypeScript with React
-   Learn (the basics) of using TypeScript and Express

## Interfaces

- Interfaces can specify a custom type:
```ts
interface UserInterface {
  name: string;
  email: string;
  age?: number;
}

function logIn(user: UserInterface) {
  console.log(`${user.name} ${user.age}`);
}
```

- But you could also do this:
```ts
function logIn(user: { name: string; email: string; age: number }) {
    console.log(`${user.name} ${user.age}`);
}
```

- Interface:
	- IShowFromApi - what are we getting back from API that we want to access
		- There might be more data on the resp.data object, this is okay
			- You’ll only get an error if you try to access something extra on IShowFrom Api that is not defined/typed in the Interface (IShowFromApi)
	- Basically, interfaces lets you know that you have *at least these things*
		- Does not gurantee that those are the *only* things

### Advantages of Interfaces

- If this can be done with an inline declaration, why create an interface?
	- Interfaces can be reused
	- Interfaces can be extended

### Reuse

- Compare these:
```ts
function logIn(user: { name: string, email: string; age?: number }) { }
function signUp(user: { name: string, email: string; age?: number }) { }
```

- To these:
```ts
function logIn(user: UserInterface) { }
function signUp(user: UserInterface) { }
```

- ~ Tip: How should you name interfaces?
	- There are two different popular opinions here:
		- Name it descriptively with the word “Interface” at the end, like UserInterface.
		- Name it descriptively but with a leading “I”, like IUser.
	- Our lead instructors have different opinions here, and your company will probably have a preferred style. 
	- Remember, always match existing code style practices.

### Extensibility

- Interfaces can inherit and build off of other interfaces.
- Suppose some users are employees, and have a salary.
```ts nums {7}
interface UserInterface {
  name: string;
  email: string;
  age?: number;
}

interface EmployeeInterface extends UserInterface {
  salary: number;
}
```
- Oftentimes, when you figure out your interface, you’ve figured out 50% of your program
	- Helpful to figure out your interface first, like writing your docstrings

- Interfaces vs classes:
	- classes have data & functionality - properties & methods
	- interfaces just have data - its’ this data, this shape of things, describe the structure of data, but they dont have methods

- Future study: there is a way to define a class and have it say it is an implementation of an interface

## Definitions/Declarations files

- When using JavaScript code from TypeScript, it’s helpful to have type help.
- This information can be provided in `.d.ts` files.
    - Example: [React’s definition file](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts)
    - When you install any library you will always want to bring in the types as well
        - Worth checking to see if someone has created a `.d.ts` file for it
    - The project **DefinitelyTyped** has just about everything
        - This project is called `@types`
        - Probably, unless a really obscure library, can just put this in front and import all the type definitions.
    - Some libraries, like *axios*, already have types and don’t need a *defs* file

```shell
$ npm install @types/lodash --save-dev
```

```ts
import * as _ from "lodash";

function rollDice(): number {
  return _.random(1, 6);  // now this has all the type information
}

console.log(rollDice())
```

## Adding TypeScript to React

- You can use the TypeScript template when making your app:
```shell
$ npx create-react-app todo-ts-demo --template typescript
```

### Migrating to TypeScript

- If your app didn’t start with TypeScript, you can add it later.
```shell
$ npm install --save typescript @types/node @types/react
$ npm install --save @types/react-dom @types/jest
```
- Rename all of your files to `.ts` or `.tsx`
- In `tsconfig.json` change strict option to false
- & Important: Make sure to add your own tsconfig.json
	- Create React App does not support generating a `tsconfig.json` file for migrating apps. In order to get the config file you’ll need to create a fresh app with the typescript template and copy the `tsconfig.json` to your existing project.

## Using with React

### Props

- & Make props an interface — React will infer the return type
```ts
interface StudentPropsInterface {
  name: string;
  email: string;
}

function PersonInfo({ name, email }: StudentPropsInterface) {
  console.log("email = ", email);
}
```


### State

- With simple state (eg strings, numbers): React will infer the right type:
```ts 
const [name, setName] = useState("");
```

- If the state is complex, use a *Generic*:
	- can use useState generically
	- alligator brackets
	- Specifying a type w/alligator brackets
	- useState is the generic technically - a function that can take multiple types, but then also determine if that first element, than 
```ts
const [user, setUser] = useState<UserInterface | null>(null);
const [data, setData] = useState<{s: string}>({ s: "ok" });
```

### Effects

- Effect callbacks almost always return void
```ts
useEffect(function loadOnMount() : void {
  // my effect ...
}
```

- ~ Note: Effect callback return a function for cleanup
	- There’s an advanced feature where an effect callback can return a function that will be called when the component unmounts. If a callback returns a function, it will need to be typed with tha function type.

- @ #rithmQ  There are some examples in the notes about using effects for cleanup - when would this be something we should do?
	- / when is the cleanup important enough to warrant writing an effect?
	- When are some important times we should use these cleanup effects?
		- most times use useEffect your happ
		- building chat system - websockets
			- connect to websocket server on mount
			- but if you return a function - that gets called when the opposite happens:
				- so if effect on mount, returned fx runs on unmount
		- disconnecting from some consistent service

### Context

companyContext.ts
```ts
interface CompanyInterface {
  name: string;
  address: string;
}

const companyContext = React.createContext<CompanyInterface | null>(null);
```

MyComponent.ts
```ts
const sampleContext: CompanyInterface = {
  name: "Rithm School",
  address: "500 Sansome Street",
};
```

### Events

- Typing events is tedious but straightforward:
	- If you are in strict mode - have to write it this way
	- but depends on company for how picky ppl will be in real life
```ts
function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
  const { name, value } = evt.target;
  setFormData(formData => ({
    ...formData,
    [name]: value,
  }));
}

/** Submit form: call function from parent & clear inputs. */
function handleSubmit(evt: React.FormEvent) {
  evt.preventDefault();
  // do stuff
}
```

[React-Typescript Cheatsheet: Forms and Events](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events)

## TypeScript with Express

- Requires some manual configuration
    - There are boilerplate setups available online
- TypeScript uses *import* (not *require*) for modules
- routers return undefined, but have to call:
	- res.json
	-  
	- 

Trying out demo
```shell
$ npm install
$ npm start
```

## Cheatsheet

[React-Typescript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/docs/basic/setup/)


## Bang operator with typescript

![](../assets/image/react-and-typescript-1683046404252.jpeg)

`!` operator says: *whatever this was, take out null & undefined*