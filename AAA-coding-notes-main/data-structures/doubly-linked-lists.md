
---
date: 2023-04-28
metadata: true
concepts: ['data-structures', 'linked-lists']
status: 'null'
docs: 
cite: ['udemy-data-structures']
---

## Doubly linked lists

- doubly linked lists have:
	- head
	- tail
	- length
- BUT! Nodes have:
	- value
	- next
	- & previous
- Same as singly linked lists:
	- ! No indicies
- Improves ability for methods:
	- removing item from the end of the array
- Tradeoff:
	- More Flexibility === Takes up more memory


```js
class Node{
	constructor(val){
		this.value = val;
		this.next = null;
		this.prev = null;
	}
}

class DoublyLinkedList{
	constructor(){
		this.head = null;
		this.tail = null;
		this.length = 0;
	}

	push(val) {
		const newNode = new Node(val);
		
		if (this.length === 0) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.prev = this.tail;
			this.tail = newNode;
		}
		
		this.length++;
		return this;
	}

	pop() {
		if(this.length === 0) return undefined;
		const currTail = this.tail;
		if(this.length === 1) {
			this.head = null;
			this.tail = null;
		} else {
			currTail.prev.next = null;
			currTail.prev = null;
			this.tail = this.tail.prev.
		}
		
		length--;
		return currTail;
	}
}
```