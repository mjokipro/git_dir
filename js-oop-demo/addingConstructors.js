class Triangle {
	constructor(a, b, c) {
		for (let side of [ a, b, c ]) {
			if (!Number.isFinite(side) || side <= 0) {
				throw new Error('Sides must be positive numbers!');
			}
		}
		this.a = a;
		this.b = b;
		this.c = c;
	}
	greet() {
		console.log('HELLO FROM A TRIANGLE!!!');
	}
	display() {
		console.log(
			`Triangle with sides of ${this.a},  ${this.b}, and ${this.c}`
		);
	}
}

const t1 = new Triangle(3, 4, 5);
t1.display();

const t2 = new Triangle(5, 7, 9);
t2.display();

new Triangle(true, false, -1); //ERROR!!!
