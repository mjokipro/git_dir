
//      E
//    B   G
//  A   D   F

class Node {
    constructor(val, left=null, right=null){
        this.val = val
        this.left = left
        this.right = right
    }
}

// A tree is just one Node "root" (see above) that has children

class BinarySearchTree {
    constructor(root=null){
        this.root = root
    }
}

const E = new Node('E')
const A = new Node('A')
const B = new Node('B')
const C = new Node('C')
const D = new Node('D')
const F = new Node('F')
const G = new Node('G')

console.log("E", E, "A", A, "B", B, "C", C, "D", D, "F", F, "G", G)

E.left = B
E.right = G
B.left = A
B.right = D
G.left = F



const newTree = new BinarySearchTree(E)
console.log("newTree", newTree)