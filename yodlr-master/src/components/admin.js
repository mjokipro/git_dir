import { useState, useEffect } from "react";
import logo from "../static/images/logo.svg";

import "../static/css/admin.css";
import { Yodlr } from "../helpers/apiYodlr";

function Admin() {

  const [formMessage, setFormMessage] = useState({ message: ". . . Loading . . . ", status: "" });

  const [userList, setUserList] = useState([]);

  useEffect(() => {

    async function getUsers() {

      // console.log("Admin - useEffect getUsers");

      try {
        // apiGetAllUsers returns a list of objects -
        // results = [
        //   {id, email, firstName, lastName, state}, ... 
        // ]
        // results is [] when there are no users returned.
        const results = await Yodlr.apiGetAllUsers();
        // console.log("Admin - useEffect getUsers: results = ", results);

        setUserList(results);

        if (results.length > 0) {
          // we have contributors / users. Message is " " so the space for the message is always on the page.
          setFormMessage({
            message: " ",
            status: ""
          })
        } else {
          setFormMessage({
            message: "No Yodlr contributors were found.",
            status: ""
          })
        }

      } catch (error) {
        console.log("Admin - useEffect getUsers: An error occurred. error = ", error);

        setFormMessage({
          message: "An error occurred.",
          status: "Admin-MsgError"
        });

      }

    }

    // console.log("Admin - useEffect: delay start");
    // let timeoutID = setTimeout(() => {
    //   console.log("Admin - useEffect: delay end");
    //   getUsers();
    // }, 2000);

    getUsers();

  }, [])

  return (
    <div>
      <h1>Yodlr Users</h1>
      <p className={formMessage.status}>{formMessage.message}</p>
      <ul className="Admin-UserList">
        {
          userList.map((user) => (
            <li className="Admin-UserListValue" key={user.id}>{`${user.email} ~ ${user.firstName} ${user.lastName} (${user.state})`}</li>
          )
          )
        }
      </ul>
    </div>
  );
}

export { Admin };
