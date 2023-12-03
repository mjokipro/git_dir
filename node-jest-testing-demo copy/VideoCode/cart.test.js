const { getCartTotal } = require("./cart");
describe("getCartTotal", function () {
  let cart;
  beforeEach(function () {
    console.log("BEFORE EACH!")
    cart = [
      { item: "le croix", price: 4.99, qty: 3 },
      { item: "pretzels", price: 8.99, qty: 10 },
    ];
  })
  afterEach(function () {
    console.log("AFTER EACH!")
  })
  beforeAll(function () {
    console.log("BEFORE ALL")
  })
  afterAll(function () {
    console.log("after ALL")
  })

  test("get total w/o discount", function () {
    const total = getCartTotal(cart);
    expect(total).toBe(104.87);
  });

  test("gets total w/discount", function () {

    const total = getCartTotal(cart, 0.5);
    expect(total).toBe(52.44);
  });
});
