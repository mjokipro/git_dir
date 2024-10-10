class Node {
  constructor(val, children) {
    this.val = val;
    this.children = children || [];
  }    

  /** find: return node obj w/this val */

  find(val) {
    let toVisitStack = [this];

    while (toVisitStack.length) {
      let current = toVisitStack.pop();

      if (current.val === val) 
        return current;

      for (let child of current.children) 
        toVisitStack.push(child)
    }
  }
  // end
  //
  /** findBFS: return node obj w/this val */

  findBFS(val) {
    let toVisitQueue = [this];

    while (toVisitQueue.length) {
      let current = toVisitQueue.shift();

      if (current.val === val) 
        return current;

      for (let child of current.children) 
        toVisitQueue.push(child)
    }
  }
  // end
}



class Tree {
  constructor(root) {
    this.root = root;
  }

  /** findInTree: return node in tree w/this val */

  findInTree(val) {
    return this.root.find(val)
  }

  /** findInTreeBFS: return node in tree w/this val */

  findInTreeBFS(val) {
    return this.root.findBFS(val)
  }
}
// end

// test

let resume = new Node("resume.txt", [])
let recipes = new Node("recipes.txt", [])
let jane = new Node("jane/", [resume, recipes])
let server = new Node("server.py", [])
let jessica = new Node("jessica/", [server])
let users = new Node("Users/", [jane, jessica])
let root = new Node("/", [users])

let tree = new Tree(root)
console.log("server.py = ", tree.findInTree("server.py"))
console.log("style.css = ", tree.findInTree("style.css"))
