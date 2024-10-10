const filterOutOdds = (...args) => args.filter(num => num % 2 === 0);

const findMin = (...args) => Math.min(...args);

const mergeObjects = (obj1, obj2) => ({...obj1, ...obj2});

const doubleAndReturnArgs = (arr, ...remain) =>
    [...arr, ...remain.map(v => v * 2)];

const removeRandom = (...items) => ( [...items.pop()] );

const extend = (arr1, arr2) => ( [...arr1, ...arr2] );

const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });

const removeKey = (obj, key) => ({ [key] : undefined, ...obj } = obj);

const combine = (obj1, obj2) => ({...obj1, ...obj2 });

const update = (obj, key, val) => ({...obj, [key]: val });