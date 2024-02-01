const MY_GLOBAL = 42;

function add(x, y) {
  return x + y;
}

class User {
  constructor(name, username) {
    this.name = name;
    this.username = username;
  }
}

const notNeededElsewhere = 'nope'; // I don't get exported!

// export an object
module.exports = {
  MY_GLOBAL: MY_GLOBAL,
  add: add,
  User: User
};
