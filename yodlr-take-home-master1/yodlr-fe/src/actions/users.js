import axios from "axios";
import { URL, GET_USERS } from "./actionTypes";

export function getAllUsers() {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`${URL}/users`);
            dispatch(gotUsers(data));
        } catch (e) {
            console.log(e);
        }
    };
}

export function createUser(body) {
    return async function (dispatch) {
        try {
            await axios.post(`${URL}/users`, body);
            const { data } = await axios.get(`${URL}/users`);
            dispatch(gotUsers(data));
        } catch (e) {
            console.log(e);
        }
    };
}

function gotUsers(users) {
    return { type: GET_USERS, payload: users };
}