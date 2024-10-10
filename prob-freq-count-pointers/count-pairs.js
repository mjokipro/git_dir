function countPairs(arr, num) {
    arr.sort((a, b) => a - b);
    let count = 0;
    let start = 0;
    let end = arr.length - 1;
    while (start < end) {
        let sum = arr[start] + arr[end];
        if (sum === num) {
            count++;
            start++;
            end--;
        } else if (sum < num) {
            start++;
        } else {
            end--;
        }
    }
    return count;
}