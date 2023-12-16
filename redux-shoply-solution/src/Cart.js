import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { applyDiscount } from "./actions";
import CartIcons from "./CartIcons";

/** Shopping cart.
 *
 * Connects to store to get info about cart and dispatches actions to store
 * on adding to cart.
 *
 * Routes /cart -> Cart -> CartIcons
 *
 */

function Cart() {
  const [discount, setDiscount] = useState("");
  const dispatch = useDispatch();
  const {
    cartItems,
    cartValue,
    discountAmount,
    discountApplied,
    products,
  } = useSelector((store) => store, shallowEqual);

  function handleChange(evt) {
    setDiscount(evt.target.value);
  }

  function handleDiscount(evt) {
    evt.preventDefault();
    dispatch(applyDiscount(discount));
    setDiscount("");
  }

  function renderTable() {
    const itemRows = Object.keys(cartItems).map(id => (
      <tr key={id}>
        <td className="text-center align-middle">
          <Link to={`/products/${id}`}>{products[id].name}</Link>
        </td>
        <td className="text-center align-middle">${products[id].price}</td>
        <td className="text-center align-middle">{cartItems[id]}</td>
        <td>
          <CartIcons id={id} />
        </td>
      </tr>
    ));

    return (
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Price</th>
            <th>Item Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{itemRows}</tbody>
      </table>
    );
  }

  return cartItems.length === 0
    ? <h2>No items in cart yet!</h2>
    : (
      <div>
        {renderTable()}
        <p>
          Total: ${cartValue}
          {discountApplied ? (
            <span className="text-success">
              - You saved {(discountAmount * 100).toFixed(0)}%!
            </span>
          ) : null}
        </p>

        <form onSubmit={handleDiscount} className="form-inline">
          <label htmlFor="discount">Discount:</label>
          <input
            id="discount"
            name="discount"
            className="form-control ml-2 mr-2"
            value={discount}
            onChange={handleChange}
          />
          <button className="btn btn-primary">Apply Discount</button>
        </form>
      </div>
    );
}

export default Cart;
