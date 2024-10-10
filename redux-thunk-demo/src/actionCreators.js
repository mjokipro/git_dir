import axios from 'axios';

const API_URL = 'https://api.github.com/users';

function fetchProfile(profile) {
  return {
    type: 'FETCH_PROFILE',
    profile
  };
}

function handleError(error) {
  return {
    type: 'ERROR',
    error
  };
}

/** Given GitHub user, retrieve & dispatch profile data. */

export function fetchProfileFromAPI(userId) {
  return async function thunk(dispatch) {
    try {
      let profile = await axios.get(`${API_URL}/${userId}`);
      dispatch(fetchProfile(profile.data));
    } catch (error) {
      dispatch(handleError(error.response.data));
    }
  };
}
