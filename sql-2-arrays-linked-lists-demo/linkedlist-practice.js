
const arr = new Uint8Array(3)
const nums = new Uint8Array(3)
// linked list 
// class Node {
//     // only 1 param
//     constructor(val) {
//         this.val = val;
//         this.next = null;
//     }
// }

// const firstPage = new Node('google.com');
// const secondPage = new Node('reddit.com');
// const thirdPage = new Node('amazon.com');

// firstPage.next = secondPage;
// secondPage.next = thirdPage;

// or setup default for next
class Node {
    constructor(val, next=null) {
        this.val = val;
        this.next = next;
    }
}


// LinkedList class
class LinkedList {
    constructor(){
        this.left = null;
        this.right = null;
    }
    traverse(){
        let currentNode = this.left;
        while(currentNode){
            console.log(currentNode.val);
            currentNode = currentNode.next;
        }
    }
    find(val){
        let currentNode = this.left;
        while(currentNode){
            if(currentNode.val === val) return true;
            currentNode = currentNode.next;
        }
        return false;
    }
    ///// to append all the way at the end WAY 1!!!
    // history.left.next.next....null
    append_start_left(val){
        let currentNode = this.left;
        while(currentNode.next){
            currentNode = currentNode.next
        }
        console.log("AT THE LAST NODE", currentNode.val)
        currentNode.next = new Node(val)
    }
}

///// Add new Node @ end of list (recursive args);
    // each Node... Node.val, Node.next.
// history.push('google');
    // history.push('reddit');
        // history.push('amazon');
            // history.push('youtube')
                // history.null
const firstPage =
    new Node('google.com',
        new Node('reddit.com',
            new Node('amazon.com',
                new Node('youtube.com'))));
        
///// Render new LinkedList(cls) - left, right
//  - history.left, history.right
const history = new LinkedList();

///// Set left to start variable
history.left = firstPage;