import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

class SnackOrBoozeApi {

  static async getSnacks() {
    const result = await axios.get(`${BASE_API_URL}/snacks`);
    return result.data;
  }

  static async getDrinks() {
    const result = await axios.get(`${BASE_API_URL}/drinks`);
    return result.data;
  }

  static async getTotItems(){
    let snacks = await this.getSnacks()
    let drinks = await this.getDrinks()
    let totItems = {
      snacks: snacks.length,
      drinks: drinks.length,
      totItems: snacks.length+drinks.length
    }
    return totItems
  }
  
  static async getAllItems(){
    let snacks = await this.getSnacks()
    let drinks = await this.getDrinks()
    
    let allItems = [snacks, drinks]

    return allItems
  }

  static async addFoodItem(data, type){
    console.log('data incoming', data, type);
    await axios.post(`${BASE_API_URL}/${type}`, data);

    console.log({message:'Thank you!'});
  }

}

export default SnackOrBoozeApi;
