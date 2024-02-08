import { GET_USERS } from "../actions/actionTypes";
export default function users(state = {}, action) {
    switch (action.type) {
        case GET_USERS:
            const allUsers = { ...state, users: action.payload };
            return allUsers;
        default:
            return state;
    }
}