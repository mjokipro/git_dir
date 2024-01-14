const unroll = require("./unroll");

describe("#unroll", function () {

  it("is a function", function () {
    expect(typeof unroll).toEqual("function");
  });

  it("unrolls an even matrix", () => {
    const smallSquare = [
      ["a", "b", "c"],
      ["d", "e", "f"],
      ["g", "h", "i"]
    ];

    let unrolledSmallSquare = ["a", "b", "c", "f", "i", "h", "g", "d", "e"];

    let unrolled = unroll(smallSquare);

    expect(unrolled).toEqual(unrolledSmallSquare);
  });

  it("unrolls a bigger matrix", () => {
    const bigSquare = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16]
    ];

    let unrolledBigSquare = [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10];

    let unrolled = unroll(bigSquare);

    expect(unrolled).toEqual(unrolledBigSquare);
  });


  it('unrolls tiny matrix', () => {
    const tinyMatrix = [
      [0,1,2]
      [3,4,5]
    ];

    let unrolledTinyMatrix = [0,1,2,5,4,3];

    let unrolled = unroll(tinyMatrix);

    expect(unrolled).toEqual(unrolledTinyMatrix);
  })
});
