const arr = [1, 3, 5, 7, 9]
    
    const copy = [...arr]
    const copy2 = [...arr]

    const popped = copy.sort().pop()

    const filteredPop = copy.filter(v => v !== popped)

    const reducedPop = filteredPop.reduce(function(accum, next){
        return accum + next
    })

    const shifted = copy2.sort().shift()

    const filteredShift = copy2.filter(v => v !== shifted)

    const reducedShift = filteredShift.reduce(function(accum, next){

        return accum + next
    })
    console.log(reducedPop, reducedShift)



// const arr = [1, 3, 5, 7, 9]


// const arr = [1, 3, 5, 7, 9]

////////////////////

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
        
        
// const arr = [1, 3, 5, 7, 9]


