import React, { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchProfileFromAPI } from "./actionCreators";

function ProfileViewer() {
  const profile = useSelector(st => st.profile, shallowEqual);
  const error = useSelector(st => st.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileFromAPI("whiskey-the-dog"));
  }, [dispatch]);

  if (error) {
    return <h1>Something bad happened. Please try again later...</h1>;
  }

  return (
    <div>
      <h1>Hello {profile.name}</h1>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}

export default ProfileViewer;
