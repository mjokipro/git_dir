function getHypotenuse(a, b) {
	return Math.sqrt(a ** 2 + b ** 2);
}
function getArea(a, b) {
	return a * b / 2;
}

// let side1 = 4;
// let side2 = 3;
// const side3 = getHypotenuse(side1, side2);

// const area = getArea(side1, side2);
// side1 = 9;
// side2 = 12;
// getHypotenuse(9, 12);

const rightTriangle = {
	a             : 9,
	b             : 12,
	getArea() {
		return this.a * this.b / 2;
	},
	getHypotenuse() {
		return Math.sqrt(this.a ** 2 + this.b ** 2);
	}
};

rightTriangle.getHypotenuse(); //15
rightTriangle.a = 3;
rightTriangle.b = 4;
rightTriangle.getHypotenuse(); //5
