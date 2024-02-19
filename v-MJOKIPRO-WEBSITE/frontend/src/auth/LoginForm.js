import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../common/Alert";


/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/websites");
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(l => ({ ...l, [name]: value }));
  }

  return (
      <div className="LoginForm">
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
          <h3 style={{color: 'rgba(246, 69, 122, 0.792)'}} className="mb-3">Log In</h3>

          <div className="card" style={{backgroundImage: 'linear-gradient(to  left, rgba(47, 45, 53, 0.777), rgba(11, 22, 36, 0.900))'}} >
            <div  className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="text-white">Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group">
                  <label className="text-white">Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button 
                   style={{   background: 'linear-gradient(45deg, #AEA1FF 5%, #dadcfa 95%)',
                   borderRadius: 5,
                   border: 0,
                   color: 'white',
                   height: 40,
                   padding: '0 30px',
                   boxShadow: '0 3px 5px 2px rgba(100, 105, 135, .3)',
                   margin: '15px',}}
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
}

export default LoginForm;
