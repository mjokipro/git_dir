process.env.NODE_ENV = "test"
const request = require("supertest")

const app = require("../app")
let cats = require("../fakeDb")

let test1 = { name: "test1"}

beforeEach(function(){
    cats.push(test1)
})

afterEach(function(){
    cats.length = 0
})

describe("GET /cats", () => {
    test("Get all cats", async () => {
        const res = await request(app).get("/cats")
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({cats: [test1]})
    })
})
describe("GET /cats/:name", ()=> {
    test("Get cat by", async () => {
        const res = await request(app).get(`/cats/${ test1.name }`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({cat: test1})
    })
    test("Test 404 page for inval name", async () => {
        const res = await request(app).post("/cats/obviouslywrong").send({ name: "test2" })
        expect(res.statusCode).toBe(404)
        
    })
})

describe("POST /cats", () => {
    test("Add a cat.", async () => {
        const res = await request(app).post("/cats").send({ name: "test2" })
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({ cat: {name: "test2"} })
    })
    test("respond 400 missing name", async () => {
        const res = await request(app).post("/cats").send({})
        expect(res.statusCode).toBe(400)
        debugger;
    })
})

describe("PATCH /cats/:name", ()=> {
    test("Test update cat name", async () => {
        const res = await request(app).patch(`/cats/${ test1.name }`).send({name: "testupdate"})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({cat: {name: "testupdate"}})
    })
    test("Test 404 page for inval name", async () => {
        const res = await request(app).post("/cats/obviouslywrong").send({ name: "test2" })
        expect(res.statusCode).toBe(404)
        
    })
})

describe("DELETE /cats/:name", () => {
    test("Deleting a cat", async () => {
        const res = await request(app).delete(`/cats/${ test1.name }`)
        expect(res.statusCode).toBe(200)
        // expect(res.body).toEqual({ message: 'Deleted' })
    })
    test("Test 404 page for inval name", async () => {
        const res = await request(app).post("/cats/obviouslywrong").send({ name: "test2" })
        expect(res.statusCode).toBe(404)
        
    })
})