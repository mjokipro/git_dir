function multLetterCount(str) {
    const letterCount = {};
    
    for (let char of str) {
        if (letterCount[char]) {
            letterCount[char]++;
        } else {
            letterCount[char] = 1;
        }
    }
    return letterCount;
}