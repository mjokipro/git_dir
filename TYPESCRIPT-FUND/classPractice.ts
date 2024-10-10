

class Dog {

    name:  string
    age:  number

    constructor(name: string, age: number){
        this.name = name
        this.age = age
    }
    bark():  string  {
        return "woof"
    }
    eat(  food:  string  ):  void  {
        console.log(`${this.name} eats ${food}`)
    }
}

const newDog = new Dog("bla", 3)


let dName:  string = newDog.name
let dAge:  number = newDog.age

let dBark:  string = newDog.bark()
let dEat:  void = newDog.eat("bone")