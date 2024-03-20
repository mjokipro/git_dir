let currentUser:  { username:  string, age:  number } = {
    username: "bla",
    age: 5,
}

interface User {
    username:  string,
    age:  number,
    email?:  string,
}

const admin:  User = {
    username:  "lil nim",
    age:  5,
    email:  "m@m.com",
}

function makeRandomUser(name:  string): User {
    return {
        username:  name,
        age:  Math.floor(Math.random() * 100)
    }
}

function printUname( user:  User ):  void {
    console.log(user.username)
}

function printUage( user: User ):  void {
    console.log(user.age)
}

function isAdult( user:  User ):  boolean {
    return user.age >= 18
}

const newUser = printUname({ username:  'little rooey', age:  4 })