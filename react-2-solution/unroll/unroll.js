const DOESNOTHING = () => {
//so we run from
    /*  0-0
    *   0-1
    *   0-2
    *   Turn! Ran entire first row always
    *         loop through first line
    *   1-1
    *   1-2
    *   2-1
    *   Turn!  Ran last item of the rest of the lines
    *          Loop through last element of all other arrays till bottom is reached
    *   2-1
    *   2-0
    *   Turn!  Ran backwards to origin
    *          Loop back to beginning of bottom array
    *   1-0
    *   Turn!  Ran up till end(previously ran elements)
    *          Loop up till we hit surface
    *   1-1    Ran across, repeating upper loop
    *   Done!  
    *   Every new row added to matrix increases loops by 2
    *   For every row added, we unroll an extra two times!
    */

//Using recursion and some math, to avoid hardcoding any values of the looping
//Uses directions to executes moving of clockwise rotation
//follows a semi-mathematical pattern of moduli, array lengths, and shrinking space
//O(n^2) due to acessing elements of elements within :(
// function DEPRICATED(squareArray, arrayLoop = 0, currentUnrolledArr = [], direction = 'across') {
//     if(arrayLoop > squareArray.length+1){
//         return currentUnrolledArr;
//     }

//     let unrolledArr = currentUnrolledArr;
//     let modulizedRoll = arrayLoop%squareArray.length;

//     if(modulizedRoll === 0 || modulizedRoll % 2 === 0 || arrayLoop % 2 == 0){
//         if(direction == 'across'){
//             for(let i=modulizedRoll; i<squareArray.length-modulizedRoll; i++){
//                 unrolledArr.push(squareArray[modulizedRoll][i]);
//             }
//         }
//         if(direction == 'backwards'){
//             for(let i=squareArray[modulizedRoll].length-modulizedRoll; i>-1; i--){
//                 unrolledArr.push(squareArray[modulizedRoll][i]);
//             }
//         }
//     }

//     if(arrayLoop % 2 !== 0){
//         if(direction == 'down'){ 
//             for(let i=arrayLoop; i<squareArray.length; i++){
//                 for(let j=squareArray[i].length-arrayLoop; j<squareArray[i].length; j++){
//                     unrolledArr.push(squareArray[i][j]);
//                 }
//             }
//         }
//         if(direction == 'up'){
//             for(let i=Math.floor(squareArray.length/2); i>modulizedRoll; i--){
//                 for(let j=modulizedRoll; j<modulizedRoll+1; j++){
//                     unrolledArr.push(squareArray[i][j]);
//                 }
//             }
//         }
//     }

//     // console.log(unrolledArr, arrayLoop, direction);

//     direction = whatDirection(direction);

//     return unroll(squareArray, arrayLoop+1, unrolledArr, direction);

// }

// const whatDirection = (direction) => {
//     if(direction == 'across'){
//         return 'down';
//     }
//     if(direction == 'down'){
//         return 'backwards';
//     }
//     if(direction == 'backwards'){
//         return 'up';
//     }
//     if(direction == 'up'){
//         return 'across';
//     }
// }
    return;
}


let unraveled = [];

const unroll = (arrNums) => {
    if(arrNums.length === 0){
        return unraveled.join('');
    }
    //top row
    unraveled.push(...arrNums.shift());

    //right columns
    unraveled.push(...arrNums.map(rows => rows.pop()));
    
    //bottom row
    unraveled.push(...arrNums.pop().reverse());

    //left columns
    unraveled.push(...arrNums.map(rows => rows.shift()).reverse());

    //repeat
    unroll(arrNums);
}

console.log(unroll([
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"]
]));

console.log(unroll([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16]
]));

console.log(unroll([
    [0,1,2],[3,4,5]
]));

module.exports = unroll;
