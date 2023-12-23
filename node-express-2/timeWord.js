const timeWord = (time) => {
    // seperate time string into hour and minute array
    const timeArr = time.split(":");
  
    // change number string into integer
    const hour = parseInt(timeArr[0]);
    const min = parseInt(timeArr[1]);
  
    // results array
    const result = [];
  
    // get matching string for hours
    if (hour === 12 && min === 0) {   // if 12:00pm - return 'noon'
      return "noon";
    } else if (hour === 0 && min === 0) {   // if 00:00, return 'midnight'
      return "midnight";
    } else if (hour === 0) {
      result.push('twelve')
    } else if (hour <= 12) {
      result.push(written.single[hour]);
    } else if (hour > 12 && hour < 25) {
      let convertHour = hour - 12;
      result.push(written.single[convertHour]);
    } else {
      return "Please enter a valid input time";
    }
  
    // get mathing string for minutes
    if (min < 10 && min > 0) {
      result.push("'o " + written.single[min]);
    } else if (min >= 10 && min <= 19) {
      result.push(written.single[min]);
    } else if (min > 19) {
      let set = min.toString().split("");
      if (set[1] !== '0') {
        set = written.multiple[set[0]] + "-" + written.single[set[1]];
        result.push(set);  
      } else {
         set = written.multiple[set[0]];
         result.push(set);
      }
    }
  
    // add am or pm to time
    hour >= 12 ? result.push("pm") : result.push("am");
  
    return result.join(" ");
  }
  
  // numeric and string pairs 
  const written = {
    single: {
      0: "",
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
      7: "seven",
      8: "eight",
      9: "nine",
      10: "ten",
      11: "eleven",
      12: "twelve",
      13: "thirteen",
      14: "fourteen",
      15: "fifteen",
      16: "sixteen",
      17: "seventeen",
      18: 'eightteen',
      19: "nineteen"
    },
    multiple: {
      2: "twenty",
      3: "thirty",
      4: 'fourty',
      5: "fifty"
    }
  };
  
  module.exports = timeWord