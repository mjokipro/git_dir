import React, { useState } from "react";
import NewListItemForm from "./NewListItemForm";
import { v4 as uuid } from "uuid";


function ShoppingList() {
  const [items, setItems] = useState([]);

  const renderItems = () => {
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}: {item.qty}
          </li>
        ))}
      </ul>
    );
  };
  // end renderItems

  /** Add new item object to cart. */
  const addItem = item => {
    let newItem = { ...item, id: uuid() };
    setItems(items => [...items, newItem]);
  };
  // end addItem

  return (
    <div className="ShoppingList">
      <NewListItemForm addItem={addItem} />
      {renderItems()}
    </div>
  );
};
// end

export default ShoppingList;
