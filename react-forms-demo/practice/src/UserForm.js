import React, { useState } from "react";

const UserForm = () => {
  const initialState = {
    username: "",
    email: "",
    password: ""
  }
  const [formData, setFormData] = useState(initialState)
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    alert(`Created user, ${username} w/ email ${email} & password ${password}`)
    setFormData(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        placeholder="password"
        name="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button>Add me to list!</button>
    </form>
  )
}

export default UserForm;