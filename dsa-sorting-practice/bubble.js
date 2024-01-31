// function bubbleSort(arr) {
//     for(let i = 0; i < arr.length; i++){
//         for(let j = 0; j < arr.length; j++){

//         }
//     }
// }

////// BUBBLE SORT - swap largest elements to top ///////

// function bubbleSort(arr) {
//     for(let i = 0; i < arr.length; i++){
//         for(let j = 0; j < arr.length; j++){
//             console.log(arr)
//             if(arr[j] > arr[j+1]){
//                 let temp = arr[j]
//                 arr[j] = arr[j+1]
//                 arr[j+1]= temp
//             }
//         }
//     }
// }

// bubbleSort([34, 5, 6, 2, 1, 99, 30])

function bubbleSort2(arr) {
    let count = 0
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length-i; j++){
            count++
            console.log(arr)
            if(arr[j] > arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1]= temp
            }
        }
    }
    console.log(count)
    return arr
}
bubbleSort2([34, 5, 6, 2, 1, 99, 30])




function bubbleSort3(arr) {
    let count = 0
    for(let i = 0; i < arr.length; i++){
        let swapped = false
        for(let j = 0; j < arr.length-i; j++){
            count++
            console.log(arr)
            if(arr[j] > arr[j+1]){
                let temp = arr[j]
                arr[j] = arr[j+1]
                arr[j+1]= temp
                swapped = true
            }
        }
        if(!swapped) break
    }
    console.log(count)
    return arr
}

bubbleSort3([34, 5, 6, 2,-2,50, 3, 4, 5, 6, 7, 9, 30])

module.exports = bubbleSort;