/// to start, call tree.traverse() in the console after running code. ///
/////// binary search trees - recursive /////////
/// post-order traversal ///

class Node {
    constructor(val, left=null, right=null){
        this.val = val
        this.left = left
        this.right = right
    }
    find(sought){
        let currentNode = this
        while(currentNode){
            console.log("VISITING: ", currentNode.val)
            if(currentNode.val === sought) return currentNode
            if(currentNode.val > sought){
                currentNode = currentNode.left
            } else {
                currentNode = currentNode.right
            }
        }
    }
}

///// additional traverse method makes balanced ///////
///// at root node E///////
class BinarySearchTree {
    constructor(root=null){
        this.root = root
    }
    /// move console.log(node.val) to BOTTOM instead of in middle ///
    traverse(node=this.root){
        if (node.left) this.traverse(node.left)
        if (node.right) this.traverse(node.right)
        console.log(node.val)
    }
}

const E = new Node('E')
const A = new Node('A')
const B = new Node('B')
const C = new Node('C')
const D = new Node('D')
const F = new Node('F')
const G = new Node('G')

E.left = B
E.right = G
B.left = A
B.right = D
G.left = F

const tree = new BinarySearchTree(E)