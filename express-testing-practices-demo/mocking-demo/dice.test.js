const rollDice = require("./dice");

describe("#rollDice", function() {
  Math.random = jest.fn(() => 0.5);

  test("it rolls the correct amount of dice", function() {
    expect(rollDice(6)).toEqual(3);
    expect(Math.random).toHaveBeenCalled();
    expect(rollDice(2)).toEqual(1);
    expect(Math.random).toHaveBeenCalled();
    expect(Math.random.mock.calls.length).toBe(2)
    console.log(Math.random.mock.calls)
  });
});
