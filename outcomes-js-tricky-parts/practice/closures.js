function idGen() {
    let start = 0
    return function generate(){
        start++
        return start
    }
}

// const nextId = idGen()

let start = 0

function generate(){
    start++
    return start
}

(function(){
    console.log("i am in this function")
})()

//////////

function bark(){
    return "woof"
}

////////////

function Animal(species){
    this.species = species
    this.isAlive = true
}

Animal.prototype.die = function(){
    if(this.isAlive){
        this.isAlive = false
        return `The ${this.species} has died`
    }
    return `CANT DIE TWICE`
}

const a = new Animal('penguin')

function Dog(name, breed, age){
    Animal.call(this, 'dog')
    this.name = name
    this.breed = breed
    this.age = age
    this.bark = function(){
        return `${this.name} says woof`
    }
}

Dog.prototype = Object.create(Animal.prototype)

Dog.prototype.howl = function(){
    return `${this.name} says howl`
}

const ringo = new Dog('ringo', 'corgi', 4)

const person = {name: 'Thomas', age: 55}

const x = Object.create(person)

///// Loops with closures /////

for(var i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i)
    }, 1000)
}

/// simplest palindrome ///

function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str == str.split('').reverse().join(''));
  }