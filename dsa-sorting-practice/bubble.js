//// MERGE SORT  ////
//  2  4  5      0  1  3
//  i  i  i >    j  j  j
// [5, 9, 20]   [1, 3, 6]

// state = [1, 3, 5, 6, 9, 20]

function mergeSort(arr1, arr2){
    const results = []
    let i = 0
    let
}

const mergedArr = mergeSort([5, 9, 20], [1, 3, 6])


////  SORT ARRAY IN PLACE "no copy made"  ///

// [34, 5, 6, 2, 1, 99, 30]
// [7, 3, 4, 5, 6]

/// FASTER SORT - GOOD FOR PARTIALLY SORTED DATA ///

// 0  0, 1, 2, 3
// 1  0, 1, 2
// 2  0, 1
// 3  0

function bubbleSort2(arr){ 
    let count = 0
    // 34, 
    for(let i = 0; i < arr.length; i++){
        let swapped = false
        for(let j = 0; j < arr.length-i; j++){
            count++
            // 34     >   5 
            if(arr[j] > arr[j+1]){
            //      34      34
                let temp = arr[j]
            //      5       5
                arr[j] = arr[j+1]
                // 34
                arr[j+1] = temp
                // flip switch when hit wall
                swapped = true
            }
            console.log("count", count)
            console.log(arr)
        }
        if(!swapped) break
    }
    return arr
}

const arr1 = bubbleSort2([34, 5, 6, 2, 1, 99, 30])

//////////////////////////////

function bubbleSort(arr){
    // 34, 
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr.length; j++){
            // 34     >   5 
            if(arr[j] > arr[j+1]){
            //      34      34
                let temp = arr[j]
            //      5       5
                arr[j] = arr[j+1]
                // 34
                arr[j+1] = temp
            }
        }
        console.log(arr)
    }
}

const newArr = bubbleSort([34, 5, 6, 2, 1, 99, 30])