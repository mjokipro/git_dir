const addCommas = require("./addCommas");

describe("#addCommas", () => {
  test("it is a function", () => {
    expect(typeof addCommas).toBe("function");
  });

  test('return no commas with whole number of 3 digits of less'), () => {
    expect(addCommas(5)).toBe(5); 
    expect(addCommas(50)).toBe(50);
    expect(addCommas(500)).toBe(500);
  }

  test('return one comma for numbers greater than 3 digits, less than 7'), () => {
    expect(addCommas(10000)).toBe('1,000');
    expect(addCommas(10000)).toBe('10,000');
  }

  test('two commas for numbers larger than 6 digits'), () => {
    expect(addCommas(100000)).toBe('100,000');
    expect(addCommas(10000000)).toBe('10,000,000');
  }

  test('it returns N commas for M size number'), () => {
    expect(addCommas(100000000)).toBe('100,000,000');
    expect(addCommas(1000000000000000)).toBe('1,000,000,000,000,000');
  }
});
