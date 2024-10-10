const double = arr => arr.map(v => v * 2);


const squareAndFindEvens = numbers => {
    numbers.map(num => num ** 2).filter(square => square % 2 === 0);
}