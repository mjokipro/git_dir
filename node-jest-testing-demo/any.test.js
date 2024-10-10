const { getRandomToy } = require("./any");

test("random toy", function () {
  let toy = getRandomToy();
  expect(toy).toEqual({
    toy: {
      name: expect.any(String),
      price: 34.99
    }
  });
});