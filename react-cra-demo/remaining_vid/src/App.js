import './App.css';
// import ShoppingCart from "./ShoppingCart"
import items from "./items";
// import moreItems from "./moreItems";
// import Alert from "./Alert";
// import Greeting from "./Greeting";

function App() {
  return (
    <div>
      <h1>Shopping Cart</h1>
      <div>
        { items.map(i => (
          <div>
            <h4>{i.name}</h4>
          </div>
        )) }
      </div>
    </div>
  );
}

export default App;
