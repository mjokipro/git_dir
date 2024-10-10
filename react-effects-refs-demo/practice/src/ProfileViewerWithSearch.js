import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileSearchForm from "./ProfileSearchForm";

const BASE_URL = "https://api.github.com/users";

/** GitHub Profile Component --- shows info from GH API */

function ProfileViewerWithSearch() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("elie");

  function search(username) {
    setUsername(username);
  };

  // this is called after component is first added to DOM
  // and every time username changes
  useEffect(function fetchUserOnUsernameChange() {
    async function fetchUser() {
      const userResult = await axios.get(`${BASE_URL}/${username}`);
      setProfile(userResult.data);
    }
    fetchUser();
  }, [username]);


  return (
    <div>
      <ProfileSearchForm search={search} />
      {profile ? <h2>{profile.name}</h2> : <i>(loading)</i>}
    </div>
  );
};

export default ProfileViewerWithSearch;
