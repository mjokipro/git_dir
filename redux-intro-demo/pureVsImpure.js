// impure: adds val to an array
function addToArrImpure(arr, val) {
  arr.push(val);
  return arr;
}

let nums = [1, 2, 3];
addToArrImpure(nums, 4);
nums; // [1, 2, 3, 4] <-- impure!
// end

// pure: adds val to an array
function addToArrPure(arr, val) {
  return [...arr, val];
}

let nums = [1, 2, 3];
addToArrPure(nums, 4);
nums; // [1, 2, 3] <-- pure!
// end

// impure: adds key-val pair to an object
function addToObjImpure(obj, key, val) {
  obj[key] = val;
  return obj;
}

let dog = { name: "Whiskey" };
addToObjImpure(dog, "favFood", "popcorn");
dog; 
// { 
//   name: "Whiskey",
//   favFood: "popcorn" 
// } <-- impure!
// end

// pure: adds key-val pair to an object
function addToObjPure(obj, key, val) {
  return { ...obj, [key]: val };
}

let dog = { name: "Whiskey" };
addToObjPure(dog, "favFood", "popcorn");
dog; //  { name: "Whiskey" } <-- pure!
// end

// impure: doubles values in an array
function doubleImpure(nums) {
  nums.forEach((num, i) => nums[i] *= 2);
  return nums;
}

let nums = [1, 2, 3];
doubleImpure(nums);
nums; // [2, 4, 6] <-- impure!
// end

// pure: doubles values in an array
function doublePure(nums) {
  return nums.map(num => 2 * num);
}

let nums = [1, 2, 3];
doublePure(nums);
nums; // [1, 2, 3] <-- pure!
// end
