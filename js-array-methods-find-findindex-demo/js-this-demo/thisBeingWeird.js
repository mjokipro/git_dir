const cat = {
	name  : 'Blue',
	breed : 'Scottish Fold',
	dance : function(dance) {
		console.log('THIS IS:', this);
		console.log(`Meow, I am a ${this.breed} and I like to ${dance}`);
	}
};

cat.dance('salsa');
const bluesDance = cat.dance;
bluesDance('salsa');

function whatIsThis() {
	console.log('this =', this);
}

const myObj = {
	func  : whatIsThis,
	color : 'purple'
};

myObj.func();
window.whatIsThis();
