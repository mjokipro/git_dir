// const arr = [1, 3, 5, 7, 9]

const popped = arr.sort().pop()
console.log(sorted)

const filteredPop = arr.filter(v => v !== popped)
console.log(filteredPop)

const reducedPop = arr.reduce(function(accum, next){
    console.log(accum, next)
    return accum + next
})
console.log(reducedPop)

const shifted = arr.sort().shift()
console.log(shifted)

const filteredShift = arr.filter(v => v !== shifted)
console.log(filteredShift)

const reducedShift = arr.reduce(function(accum, next){
    console.log(accum, next)
    return accum + next
})
console.log(reducedShift)

// const arr = [1, 3, 5, 7, 9]


// const arr = [1, 3, 5, 7, 9]

////////////////////
const arr = [1, 3, 5, 7, 9]

function arrStuff(arr){
    let arrCopy = arr
    console.log(arrCopy)

    function get(arrCopy){
        console.log("Inside get")
        return arrCopy
    }

    // function sortPop(){
    //     const popped = get().sort().pop()
    //     console.log(popped)
    // }

    // function filterArr(arr){

    // }
}

const result = arrStuff(arr)
console.log(result)