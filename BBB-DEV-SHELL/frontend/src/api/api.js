import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
const BIBLE_BASE_URL="Romans 12:1-2,5-7,9,13:1-9,10"

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
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

  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }
  
  static async signup(data) {
    let res = await this.request(`auth/regiser`, data, "post");
    return res.token;
  }

  static async getAllScriptures() {
    let res = await this.request(`${BIBLE_BASE_URL}`, {});
    return res.users;
  }

  // Individual API routes
  static async getAllUsers(username) {
    let res = await this.request(`users`, {username});
    return res.users;
  }

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getUserID(id) {
    let res = await this.request(`users/${id}`);
    return res.user;
  }
  
  static async getAllMessages(id) {
    let res = await this.request(`messages`, {id});
    return res.messages;
  }
  
  static async getMessage(id) {
    let res = await this.request(`messages/${id}`);
    return res.message;
  }

  static async postMessage(data) {
    let res = await this.request(`messages`, data, "post");
    return res.message;
  }

  /////////
  static async editPost(id, data) {
    let res = await this.request(`posts/${id}`, data, "patch");
    return res.post;
  }

  static async removePost(id) {
    let res = await this.request(`posts/${id}`, {}, "delete");
    return res.post;
  }
  ///////////

  static async updateMessage(data) {
    let res = await this.request(`messages`, data, "post");
    return res.message;
  }

  static async removeMessage(id) {
    let res = await this.request(`messages/${id}/remove`, {}, "post");
    return res.message;
  }

  static async getAllPosts(title = {}) {
    let res = await this.request(`posts`, {title});
    return res.posts;
  }

  static async getPostsPosts(title) {
    let res = await this.request(`posts`, {title});
    return res.posts;
  }

  static async getPost(id) {
    let res = await this.request(`posts/${id}`);
    return res.post;
  }
  
  static async addPost(data) {
    let res = await this.request(`posts`, data, "post");
    return res.post;
  }

  static async getAllTags(name) {
    let res = await this.request(`tags`, {name});
    return res.tags;
  }

  static async getTagsPost(id) {
    let res = await this.request(`tags/posts/${id}`);
    return res.tags;
  }

  /** Get details on a company by handle. */

  static async getTag(id) {
    let res = await this.request(`tags/${id}`);
    return res.tag;
  }

  static async saveProfile(username, data){
    let res = await this.request(`users/${username}`, data, "patch")
    return res.user
  }

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
// "eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcwNTM3OTgwMn0." + 
// "x7CgDzIXbkX49O4Prt9ixCHPNxt0ett1vDsa32QyHAE";

export default JoblyApi