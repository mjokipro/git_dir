charCount("Your PIN number is 1234!")

/*
* {"x":"y"
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    b: 1,
    e: 1,
    i: 2,
    m: 1,
    n: 2,
    o: 1
* }
*/



// str1.length must be === str2.length
// ratio letters must be equal

// validAnagram("", "") true
// validAnagram("aaz", "zza") false
// validAnagram("anagram", "nagaram") true
// validAnagram("rat", "cat") false
// validAnagram("awesome", "awesom") false
// validAnagram("qwerty", "qeywrt") true
// validAnagram("hello", "ehllo") true

// ######### FREQUENCY COUNTER USING MAP #########

function fCounter(str){
    const freq = new Map()

    for(let char of str){
        let valCount = freq.get(char) || 0
        freq.set(char, valCount + 1)
    }

    return freq
}

const newStr = fCounter("hello")

function validAnagram(str1, str2){
                                // [ k, k[v] ], [ k, k[v] ]
    const charMap1 = fCounter(str1) // { a:  2    ,   z:  1 } // obj1
    const charMap2 = fCounter(str2) // { z:  2    ,   a:  1 } // obj2

    /// ########################################################## ///

    //       {    1     ,      2   },       {    1     ,      2   }
    //       {key, val  ,  key, val}        {key, val  ,  key, val}
    // obj1: { a:  2    ,   z:  1  }, obj2: { z:  2    ,   a:  1  }
    // obj2: { z:  2    ,   a:  1  }
    
    if(charMap1.size !== charMap2.size) return false
    for(let key in charMap1.keys()) {
        if(charMap2.get(key) !== charMap1.get(key)) return false
        console.log(key)
    }

    return [charMap1, charMap2, true]
}

const result = validAnagram("rat", "cat")


// ######## FREQUENCY COUNTER USING OBJ ############
//
// function fCounter(str){
//     const freq = {}

//     for(let char of str){
//         freq[char] = (freq[char] + 1) || 1
//     }

//     return freq
// }

// function validAnagram(str1, str2){
    
//     if(!str1.length === str2.length) return false

//                                 // [ k, k[v] ], [ k, k[v] ]
//     const obj1 = fCounter(str1) // { a:  2    ,   z:  1 } // obj1
//     const obj2 = fCounter(str2) // { z:  2    ,   a:  1 } // obj2
//     const arr = []

//     /// ########################################################## ///

//     //       {    1     ,      2   },       {    1     ,      2   }
//     //       {key, val  ,  key, val}        {key, val  ,  key, val}
//     // obj1: { a:  2    ,   z:  1  }, obj2: { z:  2    ,   a:  1  }
//     // obj2: { z:  2    ,   a:  1  }
//     for(let key in obj1) {
//         if(!obj2[key]) return false
//         if(obj1[key] !== obj2[key]) return false

//         debugger

//         arr.push(key)
//         console.log(key)
//     }

//     return [arr, true]
// }

// const result = validAnagram("rat", "cat")

// ###################### END #########

// #### BETTER SQUARES FREQ COUNTER [2, 2, 4, 1, 2] [4, 4, 16, 1, 16]

// function makeFreqCounter(arr){
//     const freqCounter = {}
//     for(let el of arr){

//         // check for NAN + 1 || 1
//         freqCounter[el] = (freqCounter[el] + 1) || 1
//     }
//     return freqCounter
// }

// const freq = makeFreqCounter([2, 2, 3])

// function squares(nums1, nums2){

//     if(nums1.length !== nums2.length) return false
//                                         //   k, v  k, v  k, v
//     const obj1 = makeFreqCounter(nums1) // { 1: 1, 2: 3, 4: 1 }
//     const obj2 = makeFreqCounter(nums2) // { 1: 1, 4: 2, 16: 2 }
//     console.log(obj1, obj2)

//     /// for every 'key' 1, 2, 4 in obj1 //
//     for(let key in obj1){

//         // if not obj2 actual key [1^2=1] = 1; [2^2=4] = 1 || 4; [4^4=16] = 1 || 4 || 16
//         if(!obj2[key ** 2]) return false

//         // check equality of values for keys for each
//         if(obj1[key] !== obj2[key ** 2]) return false
//     }
//     return true
// }

// const newArr = squares([1, 4, 2], [1, 4, 136])

//  find nums1 [1, 4, 2] in nums2 [1, 4, 16]

// function squares(nums1, nums2){
//     if(nums1.length !== nums2.length) return false
//     for(let i = 0; i < nums1.length; i++){

//         ///// find the index of nums1[i] in nums2 /////
//         const foundIdx = nums2.indexOf(nums1[i] ** 2)
//         if(foundIdx === -1) return false
//         ///  if foundIdx, cut it out of nums2  ///
//         nums2.splice(foundIdx, 1)
//     }
//     return true
// }

// const newArr = squares([1, 4, 2], [1, 4, 16])

////// REDUCER FREQ COUNTER /////////

// function charCount(str){
//     //  split the string into arr and reduce
//     return str.split('').reduce((obj, char) => {
//             //  if key "x" is letter or number - downcase 1st
//         if(/[A-Z0-9]/i.test(char)){
//             char = char.toLowerCase()
//             //  if val "y" is in object, add 1 to count
//             obj[char] = (obj[char] + 1) || 1
//         }
//         return obj
//     }, {})
// }

// const newArr = charCount('whats up you stupDFDAidassmotherfucker')


// function charCount(str){
//     //  create empty object to hold char counts
//     const obj = {}
//     //  loop over each char in str
//     for(let char of str){
//         //  if key "x" is letter or number - downcase 1st
//         if(/[A-Z0-9]/i.test(char)){
//             char = char.toLowerCase()
//             //  if val "y" is in object, add 1 to count
//             obj[char] = (obj[char] + 1) || 1
//         }
//     }
//     //  return object with character counts
// return obj
// }

// const newArr = charCount('whats up you stupDFDAidassmotherfucker')

// function charCount(str){
//     //  create empty object to hold char counts
//     const obj = {}
//     //  loop over each char in str
//     for(let char of str){
//         //  if key "x" is letter or number - downcase 1st
//         if(/[A-Z0-9]/i.test(char)){
//             char = char.toLowerCase()
//             //  if val "y" is in object, add 1 to count
//             if(obj[char]){
//                 obj[char] += 1
//             } 
//             else {
//                 //  else add to object and set count to 1
//                 obj[char] = 1
//             }
//         }
//     }
//     //  return object with character counts
// return obj
// }

// const newArr = charCount('whats up you stupDFDAidassmotherfucker')


