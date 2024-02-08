import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

class Yodlr {

    /**
     * request is a common method to communicate with the backend server. 
     *  endpoint - string, the significant part of the api route for this request. 
     *  data - object, for post and put requests, an object with the fields. Typically
     *   id, email, firstName, lastName, and state. 
     *  method - string, the RESTful API method (get, put, post, delete). Defaults to 'get' 
     *   when not provided.
     *  token - string, for calls that require authorization, the token for validation and 
     *   authorization access. 
     * @param {*} data 
     * @returns on success, an object with data returned from the api.
     */
    static async request(endpoint, data = {}, method = "get", token = "") {

        const url = `${API_URL}/${endpoint}`;


        // The authorization token gets passed to the api via the 'Authorization' header, {Authorization: token}. 
        // Handle the headers by including an Authorization header when a token was passed as an argument.
        const headers = (token)
            ? { Authorization: `${token}` }
            : {};

        // console.debug("API Call (Yodlr):", endpoint, data, method, headers);

        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.debug("Yodlr API Error: err:", err);

            throw err.response;

        }
    }



    /**
     * apiGetAllUsers gets all Yodlr users from the Yodlr database via a 'get' request.
     * Method returns a list of objects with id, email, firstName, lastName, and state 
     *  for all Yodlr users.
     * @returns a list of objects with id, email, firstName, lastName, and state 
     *  for all Yodlr users.
     */
    static async apiGetAllUsers() {

        // console.log("Yodlr API - apiGetAllUsers");

        try {
            const result = await this.request("users");
            // console.log("Yodlr API - apiGetAllUsers: result =", result);
            return result;

        } catch (error) {
            throw error
        }

    }

    /**
     * apiRegister adds a new user to the Yodlr database via a post request.
     *  data object must contain a email, firstName, lastName, and state fields. 
     * Method returns an object which contains id for the new user plus their 
     *  email, firstName, LastName, and state.
     * @param {*} data 
     * @returns an object which contains id for the new user plus their email
     *  firstName, LastName, and state.
     */
    static async apiRegister(data) {

        // console.log("Yodlr API - apiRegister: data=", data);

        try {
            const result = await this.request("users", data, "post");
            // console.log("Yodlr API - apiRegister: result =", result);
            return result;

        } catch (error) {
            throw error
        }

    }

}

export {
    Yodlr
};
