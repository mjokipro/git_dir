// a function to create a simple
// frequency counter using an object

function createFrequencyCounter(a) {
    let frequencies = {};
  
    for (let val of a) {
      let valCount = frequencies[val] || 0;
      frequencies[val] = valCount + 1;
    }
  
    return frequencies;
  }
  
let newArr = createFrequencyCounter([1, 2, 3, 4, 3, 2, 1])







// let arr = [1, 1, 0, -1, -1]

// function outer(arr){

//     function createFrequencyCounter(array) {
//         let frequencies = {};
    
//         for (let val of array) {
//         let valCount = frequencies[val] || 0;
//         frequencies[val] = valCount + 1;
//         }
    
//         return frequencies;
//     }

//     let newObj = createFrequencyCounter(arr)

//     for (let val of Object.values(newObj)) {
//         console.log(val / arr.length)
//     }

// }

// let newArr = outer([1, 1, 0, -1, -1])