const { square, cube } = require('./square');

describe('square function', function () {
  test('square should square a number', function () {
    const res = square(3)
    expect(res).toEqual(9)
  })

  test('square should square negative numbers', function () {
    const num = square(-9);
    expect(num).toEqual(81)
  })
})

describe('cube function', function () {
  test('should cube a positive number', function () {
    const num = cube(3);
    expect(num).toEqual(27)
    const num2 = cube(2);
    expect(num2).toEqual(8)
  })
})
