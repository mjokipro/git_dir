let currentUser:  { username:  string, age:  number } = {
    username: "bla",
    age: 5,
}

function printUname( user:  { username:  string, age:  number } ):  void {
    console.log(user.username)
}

const newUser = printUname({ username:  'little rooey', age:  4 })