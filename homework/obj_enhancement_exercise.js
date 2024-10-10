const createInstructor = (firstName, lastName) => ({ firstName, lastName });

let favoriteNumber = 42;
const instructor1 = {
    firstName: "Colt",
    [favoriteNumber]: "That is favorite",
}

const instructor = {
    firstName: "Colt",
    sayHi() {
        return 'Hi!';
    },
    sayBye() {
        return this.firstName, "says bye!";
    },
}

const createAnimal = (species, verb, noise) => {
    return {
        species,
        [verb]() {
            return noise;
        }
    }
}