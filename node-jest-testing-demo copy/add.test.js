const { add } = require("./add");

test('add should return sum', function () {
  let sum = add(2, 3);
  expect(sum).toEqual(5);
});
// end


describe("add function", function () {

  test('return sum', function () {
    let sum = add(2, 3);
    expect(sum).toEqual(5);
  });

  test('return sum with neg numbers', function () {
    let sum = add(-2, 3);
    expect(sum).toEqual(1);
  });

});
// end
