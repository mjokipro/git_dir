process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// use small value here so tests are fast
const BCRYPT_WORK_FACTOR = 1;

let testUserToken;
let testAdminToken;

beforeEach(async function () {
  const hashedPassword = await bcrypt.hash(
    "secret", BCRYPT_WORK_FACTOR);
  await db.query(`INSERT INTO users VALUES ('test', $1)`,
    [hashedPassword]);
  await db.query(`INSERT INTO users VALUES ('admin', $1)`,
    [hashedPassword]);

  // we'll need tokens for future requests
  const testUser = { username: "test" };
  const testAdmin = { username: "admin" };
  testUserToken = jwt.sign(testUser, SECRET_KEY);
  testAdminToken = jwt.sign(testAdmin, SECRET_KEY);
});
// end

/** POST /register returns `{username}` */

describe('POST /register', function () {
  test("returns {username}", async function () {
    const response = await request(app)
      .post(`/register`)
      .send({ username: "test2", password: "secret2" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ username: "test2" });
  });
});


/** POST /login returns a JWT token **/

describe('POST /login', function () {
  test("returns logged in msg", async function () {
    const response = await request(app)
      .post(`/login`)
      .send({ username: "test", password: "secret" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }));
  });

  test("fails with wrong password", async function () {
    const response = await request(app)
      .post(`/login`)
      .send({ username: "test", password: "WRONG" });
    expect(response.statusCode).toBe(400);
  });
});


describe("GET /topsecret", function () {
  test("returns 'Made it'", async function () {
    const response = await request(app)
      .get(`/topsecret`)
      .send({ _token: testUserToken });
    expect(response.statusCode).toBe(200);
  });

  test("returns 401 when logged out", async function () {
    const response = await request(app)
      .get(`/topsecret`); // no token being sent!
    expect(response.statusCode).toBe(401);
  });

  test("returns 401 with bad token", async function () {
    const response = await request(app)
      .get(`/topsecret`)
      .send({ _token: "garbage" }); // invalid token!
    expect(response.statusCode).toBe(401);
  });
});

afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM users");
});

afterAll(async function () {
  // close db connection
  await db.end();
});
