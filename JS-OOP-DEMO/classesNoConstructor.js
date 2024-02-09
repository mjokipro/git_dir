class Triangle {
	greet() {
		console.log('HELLO FROM TRIANGLE!!!');
	}
	display() {
		console.log(`Triangle with sides of ${this.a} and ${this.b}`);
	}
}

const firstTri = new Triangle();
firstTri.a = 3;
firstTri.b = 4;
const secondTri = new Triangle();
secondTri.a = 9;
secondTri.b = 12;
