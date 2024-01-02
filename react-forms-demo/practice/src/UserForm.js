import React, { useState } from "react";

const UserForm = () => {
  // const [username, setUsername] = useState("")
  // const [email, setEmail] = useState("")
const INITIAL_STATE = {
    username: "",
    email: "",
    password: ""
}

  const [formData, setFormData] = useState(INITIAL_STATE)

  const handleChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    const {name, value} = e.target
    setFormData(data => ({
      ...data,
      [name]: value
    }))
  }

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {username, email, password} = formData
    alert(`Created user:  ${username} email:  ${email} password:  ${password}`)
    setFormData(INITIAL_STATE)
  }

  return (
    <form>
    {/* <form onSubmit={handleSubmit}> */}
      <label htmlFor="username">Username</label>
      <input
      id="username"
      type="text"
      name="username"
      placeholder="username"
      value={formData.username}
      onChange={handleChange} />

      <label htmlFor="email">Email</label>
      <input
      id="email"
      type="email"
      name="email"
      placeholder="email"
      value={formData.email}
      onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
      id="password"
      type="test"
      name="password"
      placeholder="password"
      value={formData.password}
      onChange={handleChange}
      />

      <button onClick={handleSubmit}>Add todo</button>
      {/* <button>Add todo</button> */}
    </form>
  )
}

export default UserForm;