const request = require("supertest");
const jwt = require("jsonwebtoken");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const Message = require("../models/message");
const { SECRET_KEY } = require("../config");


describe("User Routes Test", function () {

  let testUserToken;

  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

    let u1 = await User.register({
      username: "test1",
      password: "password",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
    });

    testUserToken = jwt.sign({ username: "test1" }, SECRET_KEY);
  });

  /** GET /users => {users: [...]}  */

  test("can get list of users", async function () {
    let response = await request(app)
      .get("/users")
      .send({ _token: testUserToken });

    expect(response.body).toEqual({
      users: [
        {
          username: "test1",
          first_name: "Test1",
          last_name: "Testy1",
          phone: "+14155550000"
        }
      ]
    });
  });

  /** GET /users => {users: [...]}  */

  describe("GET /users/:username", function () {
    test("can get user", async function () {
      let response = await request(app)
        .get("/users/test1")
        .send({ _token: testUserToken });

      expect(response.body).toEqual({
        user: {
          username: "test1",
          first_name: "Test1",
          last_name: "Testy1",
          phone: "+14155550000",
          join_at: expect.any(String),
          last_login_at: expect.any(String),
        }
      });
    });

    test("401 on missing user", async function () {
      let response = await request(app)
        .get("/users/wrong")
        .send({ _token: testUserToken });

      expect(response.statusCode).toEqual(401);
    });
  });
});


describe("User Messages Routes Test", function () {

  let testUserToken;

  beforeEach(async function () {
    await db.query("DELETE FROM messages");
    await db.query("DELETE FROM users");

    let u1 = await User.register({
      username: "test1",
      password: "password",
      first_name: "Test1",
      last_name: "Testy1",
      phone: "+14155550000",
    });

    let u2 = await User.register({
      username: "test2",
      password: "password2",
      first_name: "Test2",
      last_name: "Testy2",
      phone: "+14155552222",
    });

    let m1 = await Message.create({
      from_username: "test1",
      to_username: "test2",
      body: "test1 -> test2",
    });

    let m2 = await Message.create({
      from_username: "test2",
      to_username: "test1",
      body: "test2 -> test1",
    });

    testUserToken = jwt.sign({ username: "test1" }, SECRET_KEY);
  });

  /** GET /users/:username/to => {messages: [...]}  */

  describe("GET /users/:username/to", function () {
    test("can get list of messages for user", async function () {
      let response = await request(app)
        .get("/users/test1/to")
        .send({ _token: testUserToken });

      expect(response.body).toEqual({
        messages: [
          {
            id: expect.any(Number),
            body: "test2 -> test1",
            sent_at: expect.any(String),
            read_at: null,
            from_user: {
              username: "test2",
              first_name: "Test2",
              last_name: "Testy2",
              phone: "+14155552222",
            }
          }
        ]
      });
    });

    test("401 on non-existent user",  async function () {
      let response = await request(app)
        .get("/users/wrong/to")
        .send({ _token: testUserToken });
      expect(response.statusCode).toEqual(401);
    });

    test("401 on wrong auth",  async function () {
      let response = await request(app)
        .get("/users/test1/to")
        .send({ _token: "wrong" });
      expect(response.statusCode).toEqual(401);
    });
  });

    /** GET /users/:username/from => {messages: [...]}  */

    describe("GET /users/:username/from", function () {
      test("can get list of messages from user", async function () {
        let response = await request(app)
          .get("/users/test1/from")
          .send({ _token: testUserToken });

        expect(response.body).toEqual({
          messages: [
            {
              id: expect.any(Number),
              body: "test1 -> test2",
              sent_at: expect.any(String),
              read_at: null,
              to_user: {
                username: "test2",
                first_name: "Test2",
                last_name: "Testy2",
                phone: "+14155552222",
              }
            }
          ]
        });
      });

      test("401 on non-existent user",  async function () {
        let response = await request(app)
          .get("/users/wrong/from")
          .send({ _token: testUserToken });
        expect(response.statusCode).toEqual(401);
      });

      test("401 on wrong auth",  async function () {
        let response = await request(app)
          .get("/users/test1/from")
          .send({ _token: "wrong" });
        expect(response.statusCode).toEqual(401);
      });
    });
});

afterAll(async function () {
  await db.end();
});
