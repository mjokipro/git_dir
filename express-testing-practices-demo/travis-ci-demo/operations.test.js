const { add, average } = require("./operations");

describe("#add", function() {
  it("adds numbers", function() {
    expect(add(2, 2)).toEqual(4);
  });
  it("handles empty inputs", function() {
    expect(add()).toEqual(0);
  });
});

describe("#average", function() {
  it("calculates the average", function() {
    expect(average(2, 2)).toEqual(2);
    expect(average(2, -2)).toEqual(0);
  });
  it("handles empty inputs", function() {
    expect(average()).toEqual(0);
  });
});
