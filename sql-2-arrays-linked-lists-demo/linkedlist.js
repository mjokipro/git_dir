/** Node class for item in linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
// end

/** LinkedList class, keeping track of head and tail. */

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  /** push(val): add node w/val to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.head === null) this.head = newNode;

    if (this.tail !== null) this.tail.next = newNode;

    this.tail = newNode;
  }
  // end

  /** print(): traverse & console.log each item. */

  print() {
    let current = this.head;

    while (current !== null) {
      console.log(current.val);
      current = current.next;
    }
  }
  // end

  /** find(val): is val in list? */

  find(val) {
    let current = this.head;

    while (current !== null) {
      if (current.val === val) return true;

      current = current.next;
    }

    return false;
  }
  // end
}

/* TEST CODE */

let ll = new LinkedList();

ll.push("apple");
ll.push("berry");
ll.push("cherry");

ll.print();

if (ll.find("berry")) {
  console.log("Found berry");
}

if (ll.find("durian")) {
  console.log("Found durian");
}
