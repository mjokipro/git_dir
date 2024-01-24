import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MessagelyApi {

  static _token

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: ` ${MessagelyApi._token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  
  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res._token;
  }
  
  static async register(data) {
    let res = await this.request(`auth/regiser`, data, "post");
    return res._token;
  }
  
  // static async applyToJob(username, id) {
  //   let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
  //   console.log(res)
  // }
  
  /** Get details on a company by handle. */

  static async getAllMessages(id) {
    let res = await this.request(`messages`, {id});
    return res.messages;
  }

  // static async getAllCompanies(name) {
  //   let res = await this.request(`companies`, {name});
  //   return res.companies;
  // }

  /** Get details on a company by handle. */

  static async getMessage(id) {
    let res = await this.request(`messages/${id}`);
    return res.message;
  }

  // static async getAllUsers(username) {
  //   let res = await this.request(`jobs`, {username});
  //   return res.users;
  // }

  static async saveProfile(username, data){
    let res = await this.request(`users/${username}`, data, "patch")
    return res.user
  }

}

MessagelyApi._token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyMyIsImlhdCI6MTcwNjA1NTc5Mn0.Hqd7klAxbK44NuFSoOw7zi2u49Irg1Rje98nK8C6QgY"

export default MessagelyApi