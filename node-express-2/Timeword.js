/*
* Takes a numeric string(00-23:00-59) that fits those parameters always
* 0-11 are am, 12-23 are pm
*/

const timeToWords = (timeString) => {
    let midnight = 0;
    let noon = 12;
    
    let hours = {0: 'twelve', 1: 'one', 2: 'two', 
                3: 'three', 4: 'four', 5: 'five', 
                6: 'six', 7: 'seven', 8: 'eight',
                9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve'}

    let minutes = {0o0:'', 0o1:'O-one', 0o2:'O-two', 0o3:' O-three', 0o4:'O-four', 0o5:'O-five',
                   0o6:'O-six', 0o7:'O-seven', '0o8':'O-eight', '0o9':'O-nine',10:'ten', 11:'eleven',
                   12:'twelve', 13:'thirteen', 14:'fourteen', 15:'fifteen', 16:'sixteen',
                   17:'seventeen', 18:'eighteen', 19:'nineteen', 20:'twenty', 21:'twenty-one', 
                   22:'twenty-two', 23:'twenty-three', 24:'twenty-four', 25:'twenty-five', 26:'twenty-six',
                   27:'twenty-seven', 28:'twenty-eight', 29:'twenty-nine', 30:'thirty', 31:'thirty-one', 
                   32:'thirty-two', 33:'thirty-three', 34:'thirty-four', 35:'thirty-five', 36:'thirty-six', 
                   37:'thirty-seven', 38:'thirty-eight', 39:'thirty-nine', 40:'forty', 41:'forty-one',
                   42:'forty-two', 43:'forty-three', 44:'forty-four', 45:'forty-five', 46:'forty-six', 
                   47:'forty-seven', 48:'forty-eight', 49:'forty-nine', 50:'fifty', 51:'fifty-one', 
                   52:'fifty-two', 53:'fifty-three', 54:'fifty-four', 55:'fifty-five', 56:'fifty-six', 57:'fifty-seven',
                   58:'fifty-eight', 59:'fifty-nine'
                  }   
    
    let output = '';

    let inputHours = timeString.split(':')[0];
    let inputMinutes = timeString.split(':')[1];

    if(parseInt(inputHours) === midnight){
        if(parseInt(inputMinutes) === midnight){
            output += 'midnight';
            return `The time is: ${output}`;
        }
    }

    if(parseInt(inputHours) === noon){
        if(parseInt(inputMinutes) === midnight){
            output += 'noon';
            return `The time is: ${output}`;
        }
    }


    for(hourNum in hours){

        if(parseInt(inputHours) == 12){
            if(parseInt(inputHours) == parseInt(hourNum)){
                output += hours[hourNum];
            }
        }
        if(parseInt(inputHours) < 12){
            if(parseInt(inputHours) == parseInt(hourNum)){
                output += hours[hourNum];

            }
        }
        if(parseInt(inputHours) > 12) {
            if(parseInt(inputHours % 12) == parseInt(hourNum)){
                output += hours[hourNum];

            }
        }
    }


    for(minuteNum in minutes){
        if(parseInt(inputMinutes) == parseInt(minuteNum)){
            output += ' ' + minutes[minuteNum];
        }
    }

    parseInt(inputHours) >= 12 ? output += ' pm' : output += ' am';
    return `The time is: ${output}`;
};

module.exports = timeToWords;