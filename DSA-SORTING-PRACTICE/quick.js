/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/



function pivot(arr, start, end){

    if(arr.length <= 1){
        return arr
    } else {
        let left = []
        let right = []
        const newArr = []
        let pivot = arr.pop()
        let length = arr.length

        console.log("left", left, "right", right, "newArr", newArr)

        for(let i = 0; i < length; i++){
            if(arr[i] <= pivot){
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return newArr
    }

}

/*
quickSort accepts an array, left index, and right index
*/

function quickSort() {}

module.exports = quickSort;