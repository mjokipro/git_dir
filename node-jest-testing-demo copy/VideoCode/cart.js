/** calculate total price rounded to two decimals
 -  discount amount is an optional float */

function getCartTotal(cart, discountAmount = 0) {
  let totalPrice = cart.reduce(
    (price, item) => (price + item.price * item.qty), 0);
  let discountedPrice = totalPrice * (1 - discountAmount);
  // toFixed returns string; convert to a number
  return +discountedPrice.toFixed(2);
}


module.exports = { getCartTotal };
