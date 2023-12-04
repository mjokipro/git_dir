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