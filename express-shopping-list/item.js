const items = require("./fakeDb")

class Item{
  constructor(name, price){
    this.name = name
    this.price = price
    items.push(this)
  }

  static findAll(){
    return items
  }

  static update(name, data){
    let i = Item.find(name)
    if(i === undefined){
      throw {message: "Not found", status: 404}
    }
    i.name = data.name
    i.price = data.price

    return i
  }

  static find(name) {
    const foundItem = items.find(v => v.name === name);
    if(foundItem === undefined){
      throw { message: "Not Found", status: 404 }
    }
    return foundItem
  }

  static remove(name) {
    let foundIdx = items.findIndex(v => v.name === name);
    if (foundIdx === -1) {
      throw {message: "Not Found", status: 404}
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item