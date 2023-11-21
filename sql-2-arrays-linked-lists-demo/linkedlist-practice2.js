
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
    ///// to append to tail WAY 2!!!
    append_start_right(val){
        const newNode = new Node(val);
        if(!this.left){
            this.left = newNode;
            this.right = newNode;
        }
        this.right.next = newNode;
        this.right = newNode;
    }
    
}

const train = new LinkedList();
train.append_start_right('Engine');
train.append_start_right('Freight Car 1');
train.append_start_right('Freight Car 2 ')