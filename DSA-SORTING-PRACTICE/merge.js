/// merge sort - BOTH LISTS MUST BE SORTED ALREADY ///

function merge(arr1, arr2){
    const results = []
    let i = 0
    let j = 0
    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            results.push(arr1[i])
            i++
        } else {
            results.push(arr2[j])
            j++
        }
    }

    /// if i is too large, will never run but will ///
    /// break loop so remaining arr2 will go in end results ///
    while(i < arr1.length){
        results.push(arr1[i])
        i++
    }

    /// if j is too large, will never run but will ///
    /// break loop so remaining arr1 will go in end results ///
    while(j < arr2.length){
        results.push(arr2[j])
        j++
    }

    return results
}

function mergeSort(arr){
    // base case
    if(arr.length <= 1) return arr
    // typical case
    const midPoint = Math.floor(arr.length/2)
    const left = mergeSort(arr.slice(0, midPoint))
    const right = mergeSort(arr.slice(midPoint))
    return merge(left, right)
}


mergeSort([5, 9, 20, 1, 3, 6])


module.exports = { merge, mergeSort};