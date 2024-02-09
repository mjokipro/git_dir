class LinkedList {
    constructor(){
        this.data = []
    }
    enqueue(val){
        this.data.push(val)
    }
    dequeue(){
        return this.data.shift()
    }
}

const ll = new LinkedList([0, 1, 2, 1, 2, 3])