const cat = {
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
const dog = {
	breed : 'Black Lab',
	name  : 'Elton'
};

cat.play.call(dog, 'bone', 'my cat');
cat.dance.call(window, 'salsa');
cat.dance('salsa');

function printThis() {
	console.log('THIS ====>>>>', this);
}

printThis.call(cat);
printThis.call(window);
printThis.call('THERE IS NO THIS!!');

const blueDance = cat.dance;
// blueDance('jitterbug');
blueDance.call(cat, 'jitterbug');

blueDance.call(dog, 'hip hop dance');
