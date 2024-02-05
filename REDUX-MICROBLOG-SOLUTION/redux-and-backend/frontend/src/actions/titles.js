import axios from 'axios';
import {FETCH_TITLES} from "./types";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api/posts";

export function fetchTitlesFromAPI() {
  return async function (dispatch) {
    const response = await axios.get(`${API_URL}`);
    return dispatch(getTitles(response.data));
  };
}

function getTitles(titles) {
  return {
    type: FETCH_TITLES,
    titles,
  };
}

