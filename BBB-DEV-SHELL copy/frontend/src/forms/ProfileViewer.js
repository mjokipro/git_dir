import React, { useState, useEffect } from "react";
import axios from "axios";

/** GitHub Profile Component --- shows info from GH API */

function ProfileViewer() {
  const [profile, setProfile] = useState(null);

  // this is called *after* component first added to DOM
  useEffect(function fetchUserWhenMounted() {
    async function fetchUser() {
      const userResult = await axios.get(
        "https://api.github.com/users/elie");
      setProfile(userResult.data);
    }
    fetchUser();
  }, []);

  return (
    <div>{profile ? <h2>{profile.name}</h2> : <i>(loading)</i>}</div>
  );
};
// end

export default ProfileViewer;
