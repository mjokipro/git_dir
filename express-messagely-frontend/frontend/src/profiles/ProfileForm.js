import React, { useState, useContext } from "react";
import Alert from "../common/Alert";
import MessagelyApi from "../api/api";
import UserContext from "../auth/UserContext";

// eslint-disable-next-line
// import useTimedMessage from "../hooks/useTimedMessage";

function ProfileForm() {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    username: user.username,
    password: user.password,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone
  });
  const [formErrors, setFormErrors] = useState([]);

  // switch to use our fancy limited-time-display message hook
  const [saveConfirmed, setSaveConfirmed] = useState(false);
  // const [saveConfirmed, setSaveConfirmed] = useTimedMessage()

  console.debug(
      "ProfileForm",
      "user=", user,
      "formData=", formData,
      "formErrors=", formErrors,
      "saveConfirmed=", saveConfirmed,
      // "currentUser Apps=", currentUser.applications
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

    let profileData = {
      username: formData.username,
      password: formData.password,
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
    };

    let username = formData.username;
    let updatedUser;

    try {
      updatedUser = await MessagelyApi.saveProfile(username, profileData);
    } catch (errors) {
      debugger;
      setFormErrors(errors);
      return;
    }

    setFormData(f => ({ ...f, password: "" }));
    setFormErrors([]);
    setSaveConfirmed(true);

    // trigger reloading of user information throughout the site
    setUser(updatedUser);
  }

  /** Handle form data changing */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({
      ...f,
      [name]: value,
    }));
    setFormErrors([]);
  }

  return (
      <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3>Profile</h3>
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <h4>Username</h4>
                <h5>{formData.username}</h5>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                    name="first_name"
                    className="form-control"
                    value={formData.first_name}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                    name="last_name"
                    className="form-control"
                    value={formData.last_name}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}

              <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
            {/* <p>My Job Applications</p> */}
            {/* <ul>{currentUser.applications.map(a => <li>Job ID:  {a}</li>)}</ul>{} */}
          </div>
        </div>
      </div>
  );
}

export default ProfileForm;
