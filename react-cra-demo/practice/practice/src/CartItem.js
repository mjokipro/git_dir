import "./CartItem.css"

const CartItem = ({name, price, quantity, img}) => (
  <div className="CartItem">
    <h4 className="CartItem-title">{name}</h4>
    <img className="CartItem-img"  src={img} alt={name} width="200"  />
    <ul>
      <li>Price: ${price}</li>
      <li>Quantity: {quantity}</li>
      <li>Subtotal: {price * quantity}</li>
    </ul>
  </div>
)

export default CartItem