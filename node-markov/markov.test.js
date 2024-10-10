const markov = require("./markov")

describe("markov tests", function(){

let lm
let words
let chains
let matthew


    beforeAll(function(){
        console.log("Run before all tests...")
        lm = new markov.MarkovMachine("the cat in the hat")
        words = lm.words
        chains = lm.chains
        matthew = "matthew"

    })

    beforeEach(function(){
        console.log("Run before each test...")
        console.log(words)
        console.log(chains)
    })

    afterEach(function(){
        console.log("Run after each test...")
    })
    
    afterAll(function(){
        console.log("Run after all tests...")
    })

    test('markov.words', function(){
        expect(words).toContain("cat")
        expect(words).not.toContain("Akash")
        expect(words).toBe(words)
        expect(words).not.toBe(matthew)
    })
    test('markov.chains', function(){
        expect(chains).not.toContain("Akash")
        expect(chains).toEqual(expect.any(Map))
        expect(chains).toBe(chains)
        expect(chains).not.toBe(matthew)
    })

})