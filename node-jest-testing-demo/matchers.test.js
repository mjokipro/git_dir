describe("matchers", function(){
  test("toBe and toEqual are different", function () {
    let nums = [1,2,3];
    let newNums = nums.slice();

    expect(nums).not.toBe(newNums);  // not the same reference!
    expect(nums).toEqual(newNums);   // same values so we use toEqual
  });
});