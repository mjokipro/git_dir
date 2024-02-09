const newSet = new Set([1, 1, 2, 2, 3, 4]); // Set(4) {1, 2, 3, 4}

const newArr = [...new Set('referee')].join(''); // 'ref'

let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false); // Map(2) {Array(3) => true, Array(3) => false}

const hasDuplicates = args => { new Set(args).size !== args.length };

const vowelCount = str => {
    const newStr = new Map();
    for (let char of str) {
        let lower = char.toLowerCase();
        if ('aeiou'.includes(lower)) {
            if (newStr.has(lower)) {
                newStr.set(lower, newStr.get(lower) + 1);
            } else {
                newStr.set(lower, 1);
            }
        }
    }
    return newStr;
}