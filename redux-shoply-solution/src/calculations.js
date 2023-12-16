// calculate the total price rounded to two decimals
// toFixed returns a string so we convert to a number
// discount amount is a % amount from redux
export function calculateCartTotal(products, cart, discountAmount = 0) {
  let total = 0;
  for (let id in products) {
    const { price } = products[id];
    const quantity = cart[id] || 0;
    total += price * quantity;
  }
  let totalWithDiscount = total * (1 - discountAmount);
  return totalWithDiscount.toFixed(2);
}

// can't just calculate the length so we sum the quantity key for each item
export function calculateTotalQuantity(cart) {
  let totalQuantity = 0;
  for (let id in cart) {
    totalQuantity += cart[id];
  }
  return totalQuantity;
}
