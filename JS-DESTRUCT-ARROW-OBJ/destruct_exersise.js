// let facts = { numPlanets: 8, yearNeptune: 1846 };
// let { numPlanets, yearNeptune } = facts;

// console.log(numPlanets, yearNeptune); // 8, 1846

// let planetFacts = {
//     numPlanets: 8,
//     yearNeptune: 1846,
//     yearMars: 1659,
// }

// let { numPlanets, ...discoveryYears } = planetFacts;

// console.log(discoveryYears); // {yearNeptune: 1846, yearMars: 1659}

function getUserData({ firstName, favColor = 'green' }) {
    return `Your name is ${firstName} and you like ${favColor}`;
}

getUserData({
    firstName: "Alexander", favColor: "purple", //'Your name is Alexander and you like purple'
});

getUserData({ firstName: "Melissa" }); // 'Your name is Melissa and you like green'

getUserData({}); // 'Your name is undefined and you like green'

// let [first, second, third] = ['Maya', 'Marisa', 'Chi'];

// console.log(first); // 'Maya'
// console.log(second); // 'Marisa'
// console.log(third); // 'Chi'

let [raindrops, whiskers, ...aFewOthers] = [
    'Raindrops on roses',
    'whiskers on kittens',
    'bright copper kettles',
    'warm woolen mittens',
    'brown paper',
]

console.log(raindrops); // "Raindrops on roses"
console.log(whiskers); // "Whiskers on kittens"
console.log(aFewOthers); // (3) ['bright copper kettles', 'warm woolen mittens', 'brown paper']

// let numbers = [10, 20, 30];
// [numbers[1], numbers[2]] = [numbers[2], numbers[1]];

// console.log(numbers); // [10, 20, 30]

// REFACTORING...

var obj = {
    numbers: {
        a: 1,
        b: 2,
    }
}

const { a, b } = obj;

let arr = [1, 2];
// [1, 2] = arr;
// var temp = arr[0];
// arr[0] = arr[1];
// arr[1] = temp;

// [arr[0], arr[1]] = [2, 1];

let raceResults = (first, second, third, ...rest) => ({ first, second, third, rest });

let { first, second, third, rest } = raceResults;

const newOne = { first, second, third, rest } = { rest, third, second, first };

raceResults(['tom', 'margo', 'allison', ['david', 'daniel',]]);

