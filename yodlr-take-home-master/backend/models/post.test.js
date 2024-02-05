"use strict";

// const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError.js");
const Post = require("./post.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,

} = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  const newPost = {

    title: "new",
    content: "New",
  };



  test("bad request with dupe", async function () {
    try {
      await Post.create(newPost);
      await Post.create(newPost);
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeFalsy();
    }
  });
});

/************************************** findAll */

describe("findAll", function () {
  test("works: all", async function () {
    let posts = await Post.findAll();
    expect(posts).toEqual([

    ]);
  });

  test("works: by title", async function () {
    let posts = await Post.findAll({ title: "test" });
    expect(posts).toEqual([
     
    ]);
  });

  // test("works: by name", async function () {
  //   let companies = await Company.findAll({ name: "1" });
  //   expect(companies).toEqual([
  //     {
  //       handle: "c1",
  //       name: "C1",
  //       description: "Desc1",
  //       numEmployees: 1,
  //       logoUrl: "http://c1.img",
  //     },
  //   ]);
  // });

  test("works: empty list on nothing found", async function () {
    let posts = await Post.findAll({ title: "nope" });
    expect(posts).toEqual([]);
  });

  test("bad request if invalid title", async function () {
    try {
      await Post.findAll({ title: "%" });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeFalsy();
    }
  });
});

/************************************** get */



  test("not found if no such post", async function () {
    try {
      await Post.get("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeFalsy();
    }
  });



  test("not found if no such post", async function () {
    try {
      await Post.update("nope", updateData);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeFalsy();
    }
  });

  test("bad request with no data", async function () {
    try {
      await Post.update("1", {});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });


/************************************** remove */



  test("not found if no such post", async function () {
    try {
      await Post.remove("nope");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeFalsy();
    }
  });

