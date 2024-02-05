"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTagIds,
  u1Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /companies */

describe("POST /posts", function () {
  const newPost = {
    title: "test", 
    content: " test",
  };

  test("ok for admin", async function () {
    const resp = await request(app)
        .post("/posts")
        .send(newPost)
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      post: newPost,
    });
  });

  test("unauth for non-admin", async function () {
    const resp = await request(app)
        .post("/posts")
        .send(newPost)
        .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
        .post("/posts")
        .send({
          title: "bla",
          content: "bla,"
        })
        .set("authorization", `Bearer ${adminToken}`);
    expect(resp.statusCode).toEqual(400);
  });

})
/************************************** GET /companies */


