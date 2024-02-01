import React, { useState } from "react";

const NameForm = () => {
  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("Check out state ->", formData);
    // do something with the data submitted
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: ""
  });

  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  };
  // end handleChange

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">First:</label>
      <input
        id="firstName"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last:</label>
      <input
        id="lastName"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <button>Add a new person!</button>
    </form>
  );
};
// end

export default NameForm;
