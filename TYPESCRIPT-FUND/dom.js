console.log("hello");
function product(x, y) {
    return x * y;
}
var prod = product(3, 4);
console.log("prod=", prod);
var btn = document.getElementById("btn");
var input = document.getElementById("username");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", function () {
    console.log("".concat(input.value));
});
