console.log("hello")

function product(x: number, y: number):  number{
    return x * y
}

const prod = product(3, 4)

console.log("prod=", prod)

const btn = document.getElementById("btn")

const input = document.getElementById("username") as HTMLInputElement

btn?.addEventListener("click", function(){
    console.log(`${input.value}`)
})
