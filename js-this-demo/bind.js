const blue = {
	name  : 'Blue',
	breed : 'Scottish Fold',
	dance : function(dance) {
		console.log('THIS IS:', this);
		console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
	},
	play  : function(...toys) {
		for (let toy of toys) {
			console.log(`${this.name} plays with ${toy} `);
		}
	}
};

const rocket = {
	name  : 'Rocket',
	breed : 'Himalayan'
};

const bDance = blue.dance;
const boundDance = bDance.bind(blue);

const rocketDance = blue.dance.bind(rocket);

const dog = {
	name  : 'Tyson',
	breed : 'Mini Aussie',
	dance : rocketDance
};

const blueDisco = blue.dance.bind(blue, 'disco');
const playsWithSocks = blue.play.bind(blue, 'left sock', 'right sock');

function applySalesTax(taxRate, price) {
	return price + price * taxRate;
}

const applyCATax = applySalesTax.bind(null, 0.0725);
const applyTXTax = applySalesTax.bind(null, 0.0625);

const bobsMembership = {
	name  : 'Bob',
	total : 250
};

const jillsMembership = {
	name  : 'Jill',
	total : 899
};

function collectMonthlyFee(fee) {
	const remaining = this.total - fee;
	this.total = remaining;
	return this.name + ' remaining balance:' + remaining;
}

const collectBobsFee = collectMonthlyFee.bind(bobsMembership, 5);
const collectJillsFee = collectMonthlyFee.bind(jillsMembership, 35);
