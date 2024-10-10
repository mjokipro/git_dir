let arr = []
let sum = 0

function arrList(){
    for(i = 1; i < 1000; i++){
        if(i % 3 === 0) {
            arr.push(i)
            sum += i
        } else if(i % 5 === 0) {
            arr.push(i)
            sum += i
        }
    }
}

arrList()
console.log(arr)
console.log(sum)