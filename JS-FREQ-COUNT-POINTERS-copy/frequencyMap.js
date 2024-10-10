// a function to create a simple
// frequency counter using a map
let arr = [1, 1, 0, -1, -1]

function createFrequencyCounter(array) {
  let frequencies = new Map();

  for (let val of array) {
    let valCount = frequencies.get(val) || 0;
    frequencies.set(val, valCount + 1);
  }

  return frequencies;
}

let newArr = createFrequencyCounter(arr)

newArr.forEach(v => console.log(v / arr.length))