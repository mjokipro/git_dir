class Node {
    constructor(val, children = []){
        this.val = val
        this.children = children
    }
    findDepthSearchFirst(val){
        const toVisitStack = [this]
        while(toVisitStack.length){
            const current = toVisitStack.pop()
            if(current.val === val) return current
        }
        for(let child of current.children){
            toVisitStack.push(child)
        }
    }
}

let amy = new Node('amy', [
    new Node('bob'), new Node('mary'), new Node('steve')
])

let e = new Node('html', [
    new Node('head', [new Node('title')]),
    new Node('body', [new Node('ul', [new Node('li'), new Node('li2')])]),
])

e.findDepthSearchFirst('li')

// let amy = new Node('amy')
// let bob = new Node('bob')
// let mary = new Node('mary')
// let steve = new Node('steve')

// amy.children.push(bob)
// amy.children.push(mary)
// amy.children.push(steve)

console.log(e)