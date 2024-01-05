class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
  findDFS(val) {
    const toVisitStack = [this];
    while (toVisitStack.length) {
      const current = toVisitStack.pop();
      console.log("VISITING:", current.val);
      if (current.val === val) {
        return current;
      }
      for (let child of current.children) {
        toVisitStack.push(child);
      }
    }
  }
  findBFS(val) {
    const toVisitQueue = [this];
    while (toVisitQueue.length) {
      const current = toVisitQueue.shift();
      console.log("VISITING:", current.val);
      if (current.val === val) {
        return current;
      }
      for (let child of current.children) {
        toVisitQueue.push(child);
      }
    }
  }
}

class Tree {
  constructor(root) {
    this.root = root;
  }
  findInTreeDFS(val) {
    return this.root.findDFS(val);
  }
  findInTreeBFS(val) {
    return this.root.findBFS(val);
  }
}

let htmlEl = new Node("html", [
  new Node("head", [new Node("title")]),
  new Node("body", [new Node("ul", [new Node("li"), new Node("li2")])]),
]);

//             html
//       head      body
//     title            ul
//                    li  li2

// let htmlEl = new Node("html",
//         [new Node("head",
//             [new Node("title")]),
//         new Node("body",
//             [new Node("ul",
//                 [new Node("li"), new Node("li2")])])]);

// let amy = new Node('amy',
//     [new Node('bob'),
//      new Node('barb'),
//      new Node('barry')])

// let amy = new Node('amy');

// let bob = new Node('bob');
// let barb = new Node('barb');
// let barry = new Node('barry');

// amy.children.push(bob);
// amy.children.push(barb);
// amy.children.push(barry);
