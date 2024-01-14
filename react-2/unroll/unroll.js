let unrolled = [];

const unroll = (arrNums) => {
    if(arrNums.length === 0){
        return unraveled.join('');
    }

    unraveled.push(...arrNums.shift());

    unraveled.push(...arrNums.map(rows => rows.pop()));
    
    unraveled.push(...arrNums.pop().reverse());

    unraveled.push(...arrNums.map(rows => rows.shift()).reverse());

    unroll(arrNums);
}

module.exports = unroll;
