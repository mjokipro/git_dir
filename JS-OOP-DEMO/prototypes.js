function Triangle(a, b) {
	this.a = a;
	this.b = b;
}

Triangle.prototype.getArea = function() {
	return this.a * this.b / 2;
};
Triangle.prototype.getHypotenuse = function() {
	return Math.sqrt(this.a ** 2 + this.b ** 2);
};

Triangle(5, 7); //RETURNS UNDEFINED!
// USING THE NEW OPERATOR:
const tri1 = new Triangle(3, 4);
tri1.getHypotenuse(); //5
const tri2 = new Triangle(9, 12);
tri2.getHypotenuse(); //15

// Array.prototype.push = function(val) {
// 	console.log(`SO YOU WANT TO ADD ${val}??`);
// 	console.log("SORRY DON'T FEEL LIKE IT!");
// };
