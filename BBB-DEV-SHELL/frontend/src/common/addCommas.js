function addCommas(num) {
    let counter = 0
    let splicer = [];
    let multiple = 3;
    if (!Number.isInteger(num)) {
        return "No decimals please. Hehe"
    }

    let number = Array.from(num.toString());
    
    for (x of number) {
        if (counter == 3) {
            splicer.push(",");
            
            counter = 0;
        }
        counter++;
        
    }
 
      
    for (comma of splicer) {
        number.splice((number.length - multiple), 0, ",");
        multiple = multiple + 4;
        
    }

    stringNum = number.join("");
    return stringNum;

}

module.exports = addCommas;