const { getCartTotal } = require("./cart");


describe("getCartTotal", function () {
  test("get total w/o discount", function () {
    const cart = [
      { item: "le croix", price: 4.99, 
      qty: 3 },
      
      { item: "pretzels", price: 8.99, 
      qty: 10 },
    ];

    const total = getCartTotal(cart);
    expect(total).toBe(104.87);
  });

  test("gets total w/discount", function () {
    const cart = [
      { item: "le croix", price: 4.99, 
      qty: 3 },
      { item: "pretzels", price: 8.99, 
      qty: 10 },
    ];

    const total = getCartTotal(cart, 0.5);
    expect(total).toBe(52.44);
  });
});
// end

// second
describe("getCartTotal", function () {
  // will hold the cart for the tests
  let cart;

  beforeEach(function () {
    cart = [
      { item: "le croix", 
      price: 4.99, qty: 3 },
      { item: "pretzels", 
      price: 8.99, qty: 10 }
    ];
  });

  test("gets total w/o discount", function () {
    const total = getCartTotal(cart);
    expect(total).toBe(104.87);
  });

  test("gets total w/discount", function () {
    const total = getCartTotal(cart, 0.5);
    expect(total).toBe(52.44);
  });
});
// end
