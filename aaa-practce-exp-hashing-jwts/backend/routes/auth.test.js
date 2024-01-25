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

/** POST /login-1 returns `{message: "Logged in!"} */

describe('POST /login-1', function () {
  test("returns logged in msg", async function () {
    const response = await request(app)
      .post(`/login-1`)
      .send({ username: "test", password: "secret" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Logged in!" });
  });

  test("fails with wrong password", async function () {
    const response = await request(app)
      .post(`/login-1`)
      .send({ username: "test", password: "WRONG" });
    expect(response.statusCode).toBe(400);
  });
});

/** POST /login returns `{message: "Logged in!"} */

describe('POST /login', function () {
  test("returns logged in msg", async function () {
    const response = await request(app)
      .post(`/login`)
      .send({ username: "test", password: "secret" });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: expect.any(String) });
  });

  test("fails with wrong password", async function () {
    const response = await request(app)
      .post(`/login`)
      .send({ username: "test", password: "WRONG" });
    expect(response.statusCode).toBe(400);
  });
});

/** GET /secret-1 - returns `{ message: "Made it!"} */

describe("GET /secret-1", function () {
  test("returns 'Made it'", async function () {
    const response = await request(app)
      .get(`/secret-1`)
      .send({ _token: testUserToken });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Made it!" });
  });

  test("returns 401 when logged out", async function () {
    const response = await request(app)
      .get(`/secret-1`); // no token being sent!
    expect(response.statusCode).toBe(401);
  });

  test("returns 401 with bad token", async function () {
    const response = await request(app)
      .get(`/secret-1`)
      .send({ _token: "garbage" }); // invalid token!
    expect(response.statusCode).toBe(401);
  });
});

/** GET /secret - returns `{ message: "Made it!" }`
 * Requirements: ensureLoginRequired
 */

describe("GET /secret success", function () {
  test("returns 'Made it'", async function () {
    const response = await request(app)
      .get(`/secret`)
      .send({ _token: testUserToken });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Made it!" });
  });
});
// end

describe("GET /secret failure", function () {
  test("returns 401 when logged out", async function () {
    const response = await request(app)
      .get(`/secret`); // no token being sent!
    expect(response.statusCode).toBe(401);
  });

  test("returns 401 with invalid token", async function () {
    const response = await request(app)
      .get(`/secret`)
      .send({ _token: "garbage" }); // invalid token!
    expect(response.statusCode).toBe(401);
  });
});
// end

/** GET /secret-admin - returns `{ message: "Made it!" }`
 * Requirements: ensureAdmin
 */

describe("GET /secret-admin w/token", function () {
  test("works when admin",
    async function () {
      const response = await request(app)
        .get(`/secret-admin`)
        .send({ _token: testAdminToken });
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ message: "Made it!" });
    });

  test("fails when not admin", async function () {
    const response = await request(app)
      .get(`/secret-admin`)
      .send({ _token: testUserToken });
    expect(response.statusCode).toBe(401);
  });
});
// end

describe("GET /secret-admin w/o token", function () {
  test("fails when logged out", async function () {
    const response = await request(app)
      .get(`/secret-admin`); // no token!
    expect(response.statusCode).toBe(401);
  });

  test("fao;s with invalid token", async function () {
    const response = await request(app)
      .get(`/secret-admin`)
      .send({ _token: "garbage" }); // invalid token!
    expect(response.statusCode).toBe(401);
  });
});
// end

afterEach(async function () {
  // delete any data created by test
  await db.query("DELETE FROM users");
});

afterAll(async function () {
  // close db connection
  await db.end();
});
