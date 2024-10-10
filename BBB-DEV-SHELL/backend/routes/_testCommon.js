"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Post = require("../models/post");
const Tag = require("../models/tag");
const { createToken } = require("../helpers/tokens");

const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM posts");

  await Post.create(
      {
        title: "test1",
        content: "test1",
      });
  await Company.create(
      {
        title: "test2",
        content: "test2",
      });
  await Company.create(
      {
        title: "test3",
        content: "test3",
      });

  testJobIds[0] = (await Tag.create(
      { name: "J1", })).id;
  testJobIds[1] = (await Job.create(
      { name: "J2", })).id;
  testJobIds[2] = (await Job.create(
      { name: "J3", })).id;

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
    isAdmin: false,
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
    isAdmin: false,
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
    isAdmin: false,
  });

  // await User.applyToJob("u1", testJobIds[0]);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1", isAdmin: false });
const u2Token = createToken({ username: "u2", isAdmin: false });
const adminToken = createToken({ username: "admin", isAdmin: true });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  // testTagIds,
  u1Token,
  u2Token,
  adminToken,
};
