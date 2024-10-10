import axios from "axios";

const BASE_API_URL = "http://localhost:3001";

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

  //get a list of all the drinks
  static async getDrinks() {
    const result = await axios.get(`${BASE_API_URL}/drinks`);
    return result.data;
  }
  
  //get a list of every item we sell
  static async getTotalCount(){
    let snacks = await this.getSnacks();
    let drinks = await this.getDrinks();

    let totalItems = {
      snacks: snacks.length,        
      drinks: drinks.length,
      totalItems: drinks.length+snacks.length
    }

    return totalItems;
  }

  //get a list of all the food items for displaying, placed in a list for very easy access
  static async getFoodItems() {
    let snacks = await this.getSnacks();
    let drinks = await this.getDrinks();

    let foodlist = [snacks, drinks];
    return foodlist;
  }

  //add a new item to the "database"
  //data is the id, name, description, recipe, serve
  //type is which, snack or drink
  static async addFoodItem(data, type){
    console.log('data incoming', data, type);
    await axios.post(`${BASE_API_URL}/${type}`, data);

    console.log({message:'Thank you!'});
  }
}

export default SnackOrBoozeApi;
