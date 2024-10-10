"use strict";

const { NotFoundError, BadRequestError } = require("../expressError.js");
const db = require("../db.js");
const Tag = require("./tag.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
} = require("./_testCommon.js");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** create */

describe("create", function () {
  let newTag = {
    name: "test1"
  };

  test("works", async function () {
    let tag = await Tag.create(newTag);
    expect(tag).toEqual({
      ...newTag,
      id: expect.any(Number),
    });
  });
});

/************************************** findAll */


/************************************** get */




/************************************** update */

