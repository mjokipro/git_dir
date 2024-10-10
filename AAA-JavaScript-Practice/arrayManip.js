function arrayManip(arr, command, location, value) {
    for (let num of arr) {
        if (command === "remove") {
            if (location === 'end') {
                return arr.pop();
            }
            return arr.shift();
        } else if (command === "add") {
            if (location === 'beginning') {
                arr.unshift(value);
                return arr;
            }
            arr.push(value);
            return arr;
        }
    }
}