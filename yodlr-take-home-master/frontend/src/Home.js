import React, {useState, useEffect} from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup";
import UsersApi from "./api/api";
import Axios from 'axios'

function Home() {

  const [users, setUsers] = useState(null)
  console.debug("users=", users)
  
  useEffect(
    function getAll() {
      async function getUsers(){
        let users = await Axios.get("http://localhost:3001/users")
        setUsers(users)
      }
      getUsers()
    }, []
  )

  return (
    <div>
      <h1>Signup</h1>
      <Signup />
      <h1>Login</h1>
      <p>Click on links above to explore site.</p>
    </div>
  );
}

export default Home;
