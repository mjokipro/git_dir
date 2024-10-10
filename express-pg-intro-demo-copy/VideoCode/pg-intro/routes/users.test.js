// Tell Node that we're in test "mode"
process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');

let testUser

beforeEach(async function(){
  let r = await db.query(`
  INSERT INTO users (name, type) 
  VALUES ('testuser', 'admin')
  RETURNING id, name, type`)
  testUser = r.rows[0]
})

afterEach(async function(){
  await db.query("DELETE FROM users")
})

afterAll(async function(){
  await db.end()
})

describe('test', () => {
  test("bla", () => {
    console.log(testUser)
    expect(1).toBe(1)
  })
})

describe("GET /users", () => {
  test("Gets a list of 1 user", async () => {
    const res = await request(app).get('/users')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      users: [testUser]
    })
  })
})

describe("GET /users/:id", () => {
  test("Gets a single user", async () => {
    const res = await request(app).get(`/users/${testUser.id}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      user: [testUser]
    })
  })
  test("Responds with 404 for invalid id", async () => {
    const res = await request(app).get(`/users/0`)
    expect(res.statusCode).toBe(404)
  })
})

describe("POST /users", () => {
  test("Creates a single user", async () => {
    const res = await request(app).post('/users').send({ name: 'BillyBob', type: 'staff' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({
      user: { id: expect.any(Number), name: 'BillyBob', type: 'staff' }
    })
  })
})
describe("PATCH /users/:id", () => {
  test("Updates a single user", async () => {
    const res = await request(app).patch(`/users/${testUser.id}`).send({ name: 'BillyBob', type: 'admin' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      user: { id: testUser.id, name: 'BillyBob', type: 'admin' }
    })
  })
  test("Responds with 404 for invalid id", async () => {
    const res = await request(app).patch(`/users/0`).send({ name: 'BillyBob', type: 'admin' });
    expect(res.statusCode).toBe(404);
  })
})

describe("DELETE /users/:id", () => {
  test("Deletes a single user", async () => {
    const res = await request(app).delete(`/users/${testUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({msg: "Deleted"})
  })
})
