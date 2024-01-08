const addCommas = (num) => {
    let newNum = num.toString().split('');

    let negativeSign = '-';


    if(num > 0){
        if(newNum.length < 4){
            return parseInt(newNum.join(''));
        }

        if(newNum.length >=4){
            console.log(num)
            for(let i=newNum.length; i>0; i-=3){
                console.log(i)
                if(newNum[i]){
                    newNum.splice(i, 0, ',');
                }
            }
            return newNum.join('');
        }
    }
    if(num < 0){
        if(newNum.length < 4){
            return parseInt(newNum.join(''));
        }

        newNum.splice(0,1);

        if(newNum.length >=4){
            console.log(num)
            for(let i=newNum.length; i>0; i-=3){
                console.log(i)
                if(newNum[i]){
                    newNum.splice(i, 0, ',');
                }
            }
            newNum.splice(0,0,negativeSign);
            return newNum.join('');
        }
    }
}


module.exports = addCommas;