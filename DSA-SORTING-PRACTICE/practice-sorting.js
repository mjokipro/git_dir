


//  i           j
// [5, 9, 20]  [1, 3, 6]

// i< j
// []
// merge back together
function merge(arr1, arr2){

    console.log("merge-incoming arr1=", arr1, "arr2=", arr2)

    const results = []
    let i = 0
    let j = 0

    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            results.push(arr1[i])
            console.log(`merge ${i}`, results)
            i++
        } else {
            results.push(arr2[j])
            console.log(`merge ${j}`, results)
            j++
        }
    }
    /////// PUSH REMAINING "TRAILING" ELEMENTS //////
    // after all sorted into one arr, above while ends.
    // must do this incase an arr is longer
    // - pushing remaining values to results
    // below will run for the longer, remaining sorted elems
    // in case [5, 9, 20]  [1, 3, 6, *9*, *10*]
    while(i < arr1.length){
        results.push(arr1[i])
        console.log("merge-remaining arr1=", results)
        i++
    }
    while(j < arr2.length){
        results.push(arr2[j])
        console.log("merge-remaining arr2=", results)
        j++
    }
    return results
}

// const newArr = merge([5, 9, 20], [1, 3, 6])

// recursively split arr into halves

function mergeSort(arr){
    // base case - if this passes, all are broken down into 0 or 1 elem
    if(arr.length <= 1) return arr

    const mid = Math.floor(arr.length/2)
    const left = mergeSort(arr.slice(0, mid))
    const right = mergeSort(arr.slice(mid))
    console.log("mergeSort arr.length=", arr.length,"mid=", mid, "left=", left, "right=", right)
    return merge(left, right)
}

const newM = mergeSort([4, 45, 67, 1, -9, 99, 23, 24, 7])

// "mid" = 4/2 or "2 m
// 1.  left = mergeSort([3, 2, 70, 48])
//      2.  left = mergeSort([3, 2])
//         3.  left = mergeSort([3])
//              4.  return left // [3]
//              5.  return right = mergeSort([2]) // [2] or "mid"
//         6.  return merge([3], [2]) // or [2], [3]