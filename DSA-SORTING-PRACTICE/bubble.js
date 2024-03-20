//// MERGE SORT  ////
//  2  4  5      0  1  3
//  i  i  i >    j  j  j
// [5, 9, 20]   [1, 3, 6]

const array = [1, 2, 3, 4, 5]





function fCounter(arr){
    const freq = {}

    for(let key of arr){
        freq[key] = (freq[key] + 1) || 1
    }

    return freq
}

//              arr1                arr2
// i  j       i0, i1,         <  j0
// 1  0      [64, 5, 1, 9, 20], [99, 21, 4, 3, 6]
function mergeSort(arr1, arr2){

    // if(!arr1.length === arr2.length) return false

    // const obj1 = fCounter(arr1)
    // const obj2 = fCounter(arr2)

    // console.log("obj1=", obj1, "obj2=", obj2)

    //   [64, ]
    const results = []
    let i = 0
    let j = 0

    //    0     5            0      5  
    while(i < arr1.length && j < arr2.length){
        //  64     <   99
        if(arr1[i] < arr2[j]){
            results.push(arr1[i])
            i++
        } else {
            results.push(arr2[j])
            j++
        }
        console.log("obj1=", arr1, "obj2=", arr2)
    }
      //  0  5
    while(i < arr1.length){
        results.push(arr1[i])
        i++
    }
    while(j < arr2.length){
        results.push(arr2[j])
        j++
    }

    console.log("results=", results)
    return results
}

const mergedArr = mergeSort([1, 9, 20], [2, 4, 6])


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