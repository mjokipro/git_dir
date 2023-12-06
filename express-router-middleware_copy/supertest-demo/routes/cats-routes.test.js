process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let cats = require("../fakeDb");

let pickles = { name: "Pickles" };

beforeEach(function() {
  cats.push(pickles);
});

afterEach(function() {
  // make sure this *mutates*, not redefines, `cats`
  cats.length = 0;
});
// end afterEach

/** GET /cats - returns `{cats: [cat, ...]}` */

describe("GET /cats", function() {
  test("Gets a list of cats", async function() {
    const resp = await request(app).get(`/cats`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({cats: [pickles]});
  });
});
// end

/** GET /cats/[name] - return data about one cat: `{cat: cat}` */

describe("GET /cats/:name", function() {
  test("Gets a single cat", async function() {
    const resp = await request(app).get(`/cats/${pickles.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({cat: pickles});
  });

  test("Responds with 404 if can't find cat", async function() {
    const resp = await request(app).get(`/cats/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /cats - create cat from data; return `{cat: cat}` */

describe("POST /cats", function() {
  test("Creates a new cat", async function() {
    const resp = await request(app)
      .post(`/cats`)
      .send({
        name: "Ezra"
      });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      cat: { name: "Ezra" }
    });
  });
});
// end

/** PATCH /cats/[name] - update cat; return `{cat: cat}` */

describe("PATCH /cats/:name", function() {
  test("Updates a single cat", async function() {
    const resp = await request(app)
      .patch(`/cats/${pickles.name}`)
      .send({
        name: "Troll"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      cat: { name: "Troll" }
    });
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/cats/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE /cats/[name] - delete cat,
 *  return `{message: "Cat deleted"}` */

describe("DELETE /cats/:name", function() {
  test("Deletes a single a cat", async function() {
    const resp = await request(app).delete(`/cats/${pickles.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
// end
