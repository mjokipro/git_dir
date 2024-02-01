const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testJobIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM posts");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(`
    INSERT INTO posts(title, content, user_id)
    VALUES ('test1', 'test1', 1),
           ('test2', 'test2', 2),
           ('test3', 'test3', 3)`);

  const resultsTags = await db.query(`
    INSERT INTO tags (name)
    VALUES ('tag1'),
           ('tag2'),
           ('tag3'),
           ('tag4')
    RETURNING id`);
  testTagIds.splice(0, 0, ...resultsTags.rows.map(r => r.id));

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  // await db.query(`
  //       INSERT INTO tags(name)
  //       VALUES ('u1', $1)`,
  //     [testTagIds[0]]);
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


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
};