class PersonNode {
    constructor(name, adjacent = new Set()){
        this.name = name
        this.adjacent = adjacent
    }
}

const homer = new PersonNode('homer simpson')
const marge = new PersonNode('marge simpson')
const maggie = new PersonNode('maggie simpson')
const lisa = new PersonNode('lisa simpson')
const grampa = new PersonNode('grampa simpson')

const friends = new FriendGraph()
friends.addPeople([homer, marge, maggie, lisa, grampa])
friends.setFriends(homer, marge)
friends.setFriends(homer, lisa)
friends.setFriends(homer, maggie)
friends.setFriends(marge, maggie)
friends.setFriends(maggie, lisa)
friends.setFriends(lisa, grampa)

const moe = new PersonNode('moe')
const barney = new PersonNode('barney')
const lenny = new PersonNode('lenny')
friends.addPeople([moe, barney, lenny])
friends.setFriends(moe, barney)
friends.setFriends(barney, lenny)

class FriendGraph{
    constructor(){
        this.nodes = new Set()
    }
    addPerson(node){
        this.nodes.add(node)
    }
    addPeople(peopleList){
        for(let node of peopleList){
            this.addPerson(node)
        }
    }
    setFriends(person1, person2){
        person1.adjacent.add(person2)
        person2.adjacent.add(person1)
    }
    areConnected(person1, person2){
        let toVisitQueue = [person1]
        let seen = new Set(toVisitQueue)
        while(toVisitQueue.length){
            let currPerson = toVisitQueue.shift()

            if(currPerson === person2) return true

            for(let neighbor of currPerson.adjacent){
                if(!seen.has(neighbor)) {
                    toVisitQueue.push(neighbor)
                    seen.add(neighbor)
                }
            }
        }
    }
}

homer.adjacent.add(marge)
marge.adjacent.add(homer)
maggie.adjacent.add(marge)
maggie.adjacent.add(homer)
homer.adjacent.add(maggie)
marge.adjacent.add(maggie)

// friends.areConnected(marge, lisa)

// homer.adjacent.push(marge)
// marge.adjacent.push(homer)