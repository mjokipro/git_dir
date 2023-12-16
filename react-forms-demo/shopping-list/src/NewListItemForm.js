import React, { useState } from "react";

/** Form for creating a new item to add to a list.
 *
 * Has state for the name/quantity of the item; on submission,
 * sends {name, qty} to fn rec'd from parent.
 *
 */

const NewListItemForm = ({ addItem }) => {
  const INITIAL_STATE = { name: "", qty: 0 };
  const [formData, setFormData] = useState(INITIAL_STATE);

  /** Send {name, quantity} to parent
   *    & clear form. */

  const handleSubmit = evt => {
    evt.preventDefault();
    addItem(formData);
    setFormData(INITIAL_STATE);
  };

  /** Update local state w/curr state of input elem */

  const handleChange = evt => {
    const { name, value }= evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };

  /** render form */

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />

      <label htmlFor="qty">Qty:</label>
      <input
        type="number"
        id="qty"
        name="qty"
        value={formData.qty}
        onChange={handleChange}
      />

      <button>Add a new item!</button>
    </form>
  );
};

export default NewListItemForm;
