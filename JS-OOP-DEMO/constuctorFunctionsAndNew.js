// const rightTriangle = {
// 	a             : 9,
// 	b             : 12,
// 	getArea() {
// 		return this.a * this.b / 2;
// 	},
// 	getHypotenuse() {
// 		return Math.sqrt(this.a ** 2 + this.b ** 2);
// 	}
// };

function Triangle(a, b) {
	this.a = a;
	this.b = b;
	this.getArea = function() {
		return this.a * this.b / 2;
	};
	this.getHypotenuse = function() {
		return Math.sqrt(this.a ** 2 + this.b ** 2);
	};
}

Triangle(5, 7); //UNDEFINED!
// USING THE NEW OPERATOR:
const tri1 = new Triangle(3, 4);
tri1.getHypotenuse(); //5
const tri2 = new Triangle(9, 12);
tri2.getHypotenuse(); //15
