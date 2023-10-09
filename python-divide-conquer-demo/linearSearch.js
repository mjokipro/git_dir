// custom indexOf implementation
function indexOf(arr, val) {

  for (let i = 0; i < arr.length; i++) {
    // if you find the value, return the index
    if (arr[i] === val) return i;
  }

  // if you never find the value, return -1
  return -1;
}

indexOf([4, 8, 15, 16, 23, 42], 15); // 2
indexOf([4, 8, 15, 16, 23, 42], 42); // 5
indexOf([4, 8, 15, 16, 23, 42], 100); // -1